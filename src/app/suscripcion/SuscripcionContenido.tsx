'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Lottie from 'lottie-react';
import animacionPremium from '../../../public/assets/lottie/premium.json'; 

export default function SuscripcionContenido() {

  useEffect(() => {
      document.title = 'Suscripción | Finkit Premium';
  }, []);

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

  const styles = {
    wrapper: {
      padding: 24,
      minHeight: '100vh',
      background: '#f3f4f6',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      background: 'white',
      padding: 32,
      borderRadius: 16,
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      maxWidth: 480
    },
    image: {
      width: '100%',
      maxHeight: 180,
      objectFit: 'contain' as const,
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111827',
      textAlign: 'center' as const,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: '#6b7280',
      marginBottom: 25,
      textAlign: 'center' as const,
    },
    benefits: {
      color: '#374151',
      fontSize: 15,
      lineHeight: 1.6,
      paddingLeft: 0,
      listStyle: 'none',
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#4E6CF2',
      color: 'white',
      padding: '12px 24px',
      borderRadius: 8,
      fontSize: 16,
      border: 'none',
      cursor: 'pointer',
      width: '100%',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <Lottie
          animationData={animacionPremium}
          loop
          autoplay
          style={{ height: 180, marginBottom: 24 }}
        />

        <h1 style={styles.title}>Haz más con Finkit Premium</h1>
        <p style={styles.subtitle}>Accede a funciones avanzadas para llevar el control total de tus finanzas.</p>

        <ul style={styles.benefits}>
          <li>✅ Más cargas de estados de cuenta PDF</li>
          <li>✅ Más reglas para categorizar automáticamente</li>
          <li>✅ Exportación a CSV</li>
        </ul>

        <button
          onClick={manejarSuscripcion}
          disabled={cargando}
          style={styles.button}
        >
          {cargando ? 'Redirigiendo…' : 'Suscribirme ahora'}
        </button>
      </div>
    </div>
  );
}
