// src/app/suscripcion/page.tsx
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuscripcionPage() {
  const [cargando, setCargando] = useState(false);
  const searchParams = useSearchParams();

  const email = searchParams?.get('email');
  const userId = searchParams?.get('user_id');

  const manejarSuscripcion = async () => {
    if (!email || !userId) {
      alert('Faltan datos del usuario.');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userId }),
      });
  
      const datos = await respuesta.json();
  
      if (datos.url) {
        window.location.href = datos.url;
      } else {
        alert('No se pudo generar el link de pago');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al iniciar la suscripción');
    } finally {
      setCargando(false);
    }
  };  

  return (
    <div style={{ padding: 24, maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <h1>Finkit Premium</h1>
      <p>Suscríbete para desbloquear funciones avanzadas.</p>

      <button
        onClick={() => manejarSuscripcion()}
        disabled={cargando}
        style={{
          marginTop: 20,
          backgroundColor: '#4E6CF2',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 8,
          fontSize: 16,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {cargando ? 'Redirigiendo…' : 'Suscribirme ahora'}
      </button>
    </div>
  );
}
