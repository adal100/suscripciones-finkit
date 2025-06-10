'use client';

import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export default function RecuperarPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('access_token');
      setAccessToken(token);

      if (token) {
        const supabaseClient = createClient(
          process.env.PUBLIC_SUPABASE_URL!,
          process.env.PUBLIC_SUPABASE_ANON_KEY!
        );
        setSupabase(supabaseClient);

        supabaseClient.auth.setSession({
          access_token: token,
          refresh_token: '',
        }).then(({ error }) => {
          if (error) {
            setError('Error validando el enlace. Intenta solicitar otro.');
          }
        });
      }
    }
  }, []);

  const handleGuardar = async () => {
    setError('');
    if (!supabase) return;

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setCargando(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setCargando(false);

    if (error) {
      setError(error.message);
    } else {
      setMensaje('✅ Contraseña actualizada. Ya puedes volver a la app.');
    }
  };

  return (
    <main
      style={{
        maxWidth: 400,
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#007AFF', marginBottom: '1rem' }}>Cambiar contraseña</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      {!mensaje && (
        <>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: '0.5rem', marginTop: '1rem', width: '100%' }}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: '0.5rem', marginTop: '1rem', width: '100%' }}
          />
          <button
            onClick={handleGuardar}
            disabled={cargando || !supabase}
            style={{
              backgroundColor: '#007AFF',
              color: '#fff',
              padding: '0.75rem',
              marginTop: '1.5rem',
              width: '100%',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {cargando ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </>
      )}
    </main>
  );
}
