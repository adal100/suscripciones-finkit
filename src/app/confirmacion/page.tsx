export default function ConfirmacionPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h1
            style={{
                color: '#007AFF',
                marginBottom: '1rem',
                fontSize: '1.75rem',
                whiteSpace: 'nowrap',
            }}
            >
            ¡Correo confirmado!
        </h1>
        <p style={{ fontSize: '16px', color: '#333' }}>
          Tu cuenta ha sido activada correctamente.
        </p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '0.5rem' }}>
          Ahora puedes abrir la app Finkit e iniciar sesión.
        </p>
      </div>
    </main>
  );
}
