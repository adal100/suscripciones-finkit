import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { customerId } = req.body;

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    const subscription = subscriptions.data[0];
    if (!subscription) return res.status(404).json({ error: 'No active subscription found' });

    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });

    return res.status(200).json({ message: 'Subscription will be canceled at period end' });
  } catch (error: any) {
    console.error('❌ Error canceling subscription:', error);
    return res.status(500).json({ error: error.message });
  }
}
