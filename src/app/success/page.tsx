'use client';

import { useEffect } from 'react';
import Lottie from 'lottie-react';
import animacionCheck from '../../../public/assets/lottie/success-check.json';


export default function SuccessPage() {

  useEffect(() => {
    document.title = 'Suscripción exitosa | Finkit';
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <Lottie
          animationData={animacionCheck}
          loop={false}
          autoplay
          style={styles.lottie}
        />
        <h1 style={styles.title}>¡Gracias por suscribirte!</h1>
        <p style={styles.text}>Tu suscripción se ha procesado correctamente.</p>
        <p style={styles.subtext}>
          Puedes regresar a la app Finkit para comenzar a disfrutar de las funciones premium.
        </p>

        <p style={styles.hint}>
          Puedes cerrar esta ventana.
        </p>
      </div>
    </div>
  );
}

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
    maxWidth: 460,
    width: '100%',
    textAlign: 'center' as const,
  },
  lottie: {
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  hint: {
    fontSize: 13,
    color: '#9ca3af',
  },
};
