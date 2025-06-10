'use client';

import { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export default function RecuperarContrasenaPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [user, setUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    console.log('✅ useEffect montado');

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('access_token');
      console.log('🔑 Token recibido:', token);
      setAccessToken(token);

      if (!token) {
        setError('No se encontró token en la URL');
        return;
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log('🌍 URL Supabase:', supabaseUrl);
      console.log('🔐 ANON KEY definida:', !!supabaseAnon);

      if (!supabaseUrl || !supabaseAnon) {
        setError('Variables de entorno faltantes');
        return;
      }

      const supabaseClient = createClient(supabaseUrl, supabaseAnon);
      setSupabase(supabaseClient);

      supabaseClient.auth
        .setSession({
          access_token: token,
          refresh_token: '',
        })
        .then(async ({ error }) => {
          console.log('📥 Resultado setSession:', error ?? '✅ Sin errores');
          if (error) {
            setError('El enlace ha expirado o es inválido.');
            return;
          }

          const { data: userData, error: userError } = await supabaseClient.auth.getUser();
          if (userError || !userData?.user) {
            console.warn('⚠️ No se pudo obtener usuario:', userError);
            setError('No se pudo validar tu sesión.');
          } else {
            console.log('👤 Usuario obtenido:', userData.user);
            setUser(userData.user);
          }
        });
    }
  }, []);

  const handleGuardar = async () => {
    console.log('🚀 Guardar contraseña ejecutado');
    setError('');

    if (!supabase) {
      console.warn('⚠️ Supabase aún no inicializado');
      return;
    }

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
      console.error('❌ Error al actualizar contraseña:', error.message);
      setError('Error al actualizar contraseña: ' + error.message);
    } else {
      console.log('✅ Contraseña actualizada exitosamente');
      setMensaje('✅ Tu contraseña fue actualizada. Ya puedes iniciar sesión en Finkit.');
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
            disabled={cargando || !supabase || !user}
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
              opacity: cargando || !supabase || !user ? 0.6 : 1,
            }}
          >
            {cargando ? 'Guardando...' : 'Guardar contraseña'}
          </button>
        </>
      )}
    </main>
  );
}
