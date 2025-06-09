// app/privacidad/page.tsx
export const metadata = {
  title: 'Política de Privacidad - Finkit',
};

export default function PrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        En Finkit nos tomamos muy en serio tu privacidad. Los datos que subes a la aplicación no son compartidos con
        terceros y se almacenan de forma segura.
      </p>
      <p className="mb-4">
        Puedes consultar más detalles dentro de la aplicación en la sección de “Mi Suscripción”.
      </p>
      <p className="text-sm text-gray-500 mt-10">Última actualización: Mayo 2025</p>
    </main>
  );
}
