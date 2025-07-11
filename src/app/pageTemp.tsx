'use client';

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', color: '#007AFF', marginBottom: '1rem' }}>
        Bienvenido a Finkit
      </h1>
      <p style={{ fontSize: '1rem', color: '#333' }}>
        Esta es una versión temporal de la landing. Volveremos pronto con algo increíble.
      </p>
    </main>
  );
}
