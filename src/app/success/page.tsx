'use client';

import { useEffect } from 'react';

export default function SuccessPage() {
  const isMobile = /iPhone|Android/i.test(navigator.userAgent);

  const handleOpenApp = () => {
    // Este esquema debe coincidir con tu configuración en React Native
    window.location.href = 'finkit://suscripcion-confirmada';
  };

  useEffect(() => {
    // Opción automática (solo si confías en el deep linking del navegador)
    // handleOpenApp();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>🎉 ¡Gracias por suscribirte!</h1>
      <p>Tu suscripción se ha procesado correctamente.</p>

      {isMobile ? (
        <button
          onClick={handleOpenApp}
          style={{
            marginTop: 24,
            padding: '12px 24px',
            backgroundColor: '#4E6CF2',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Volver a la app
        </button>
      ) : (
        <p style={{ marginTop: 24, color: '#888' }}>
          Puedes cerrar esta ventana y volver a Finkit.
        </p>
      )}
    </div>
  );
}
