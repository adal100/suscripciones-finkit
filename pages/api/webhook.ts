import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Error verificando firma', err);
    return res.status(400).send(`Webhook Error: ${(err as any).message}`);
  }

  // ✅ Activación del plan premium
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const subscriptionId = session.subscription;

    if (!email || typeof subscriptionId !== 'string') {
      console.warn('⚠️ Falta email o subscriptionId');
      return res.status(400).end();
    }

    // ✅ Obtener la suscripción directamente desde Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['items.data'], // para asegurar que items tenga contenido completo
    });

    const subscriptionItem = subscription.items.data[0];
    const expiresAt = new Date(subscriptionItem.current_period_end * 1000).toISOString();
    const customerId = subscription.customer as string;

    const { error } = await supabase
      .from('usuarios')
      .update({
        plan: 'premium',
        plan_expira_en: expiresAt,
        stripe_customer_id: customerId,
      })
      .eq('email', email);

    if (error) {
      console.error('❌ Error actualizando usuario a premium', error);
      return res.status(500).end();
    }

    console.log(`✅ Usuario actualizado a premium: ${email}`);
  }

  // ⏳ Cancelación al final del periodo
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;

    const fullSuscription = await stripe.subscriptions.retrieve(subscription.id, {
      expand: ['items.data'], // para asegurar que items tenga contenido completo
    });

    if (subscription.cancel_at_period_end) {
      const subscriptionItem = fullSuscription.items.data[0];
      const customerId = subscription.customer as string;
      const fechaExpira = new Date(subscriptionItem.current_period_end * 1000).toISOString();

      const { data: user, error } = await supabase
        .from('usuarios')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

      if (error || !user) {
        console.warn('⚠️ Usuario no encontrado para cancelación', customerId);
        return res.status(400).end();
      }

      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ plan_expira_en: fechaExpira,  plan_cancelado: true })
        .eq('id', user.id);

      if (updateError) {
        console.error('❌ Error actualizando expiración', updateError);
        return res.status(500).end();
      }

      console.log(`⏳ Plan premium se cancelará el: ${fechaExpira}`);
    }
  }

  // 🚫 Pago de renovación fallido
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;

    const { data: user, error } = await supabase
      .from('usuarios')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (error || !user) {
      console.warn('⚠️ Usuario no encontrado tras fallo de pago', customerId);
      return res.status(400).end();
    }

    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ plan: 'basico', plan_expira_en: null })
      .eq('id', user.id);

    if (updateError) {
      console.error('❌ Error al revertir plan a básico', updateError);
      return res.status(500).end();
    }

    console.log(`🚫 Plan premium revocado por fallo de pago del usuario ID: ${user.id}`);
  }

  res.status(200).json({ received: true });
}
