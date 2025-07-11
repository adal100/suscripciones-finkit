'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LandingPage() {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <main>
      {/* Hero principal */}
      <section className={styles.hero}>
        <h1>Descubre en qué se te va el dinero, sin hacer cuentas</h1>
        <p style={{ marginBottom: '1rem' }}>
          Sube tu estado de cuenta. Finkit lo analiza por ti y te muestra todo claro, visual y automático.
        </p>

        {showAnimation && (
          <Player
            autoplay
            loop
            src="/assets/lottie/hero-animation.json"
            style={{ height: '220px', margin: '0 auto' }}
          />
        )}

        <a href="/suscripcion">Empieza gratis</a>
      </section>

      {/* Mockup */}
      <section className={styles.section}>
        <img
          src="/assets/img/mockup-finkit.jpeg"
          alt="Vista previa de la aplicación Finkit"
          style={{
            maxWidth: '300px',
            margin: '0 auto',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            display: 'block'
          }}
        />
      </section>

      {/* Beneficios */}
      <section className={`${styles.section} ${styles.altBackground}`}>
        <h2>¿Qué puedes hacer con Finkit?</h2>
        <ul style={{ textAlign: 'left', maxWidth: '640px', margin: '0 auto' }}>
          <li>📤 <strong>Sube tu estado de cuenta en segundos</strong></li>
          <li>🧠 <strong>Finkit categoriza tus gastos automáticamente</strong></li>
          <li>⚙️ <strong>Crea reglas personalizadas para tus gastos</strong></li>
          <li>📈 <strong>Visualiza tu dinero en gráficos claros y exporta lo que necesites</strong></li>
        </ul>
      </section>

      {/* Planes */}
      <section className={styles.section}>
        <h2>¿Cuál plan te conviene más?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Gratis</h3>
            <ul>
              <li>5 estados de cuenta</li>
              <li>Hasta 10 reglas</li>
              <li>Dashboard básico</li>
            </ul>
          </div>
          <div className={styles.card}>
            <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 'bold' }}>★ Más popular</div>
            <h3>Premium</h3>
            <ul>
              <li>Estados de cuenta ilimitados</li>
              <li>Reglas ilimitadas</li>
              <li>Exportación a Excel</li>
              <li>Soporte prioritario</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className={`${styles.section} ${styles.altBackground}`}>
        <h2 className={styles.testimonialTitle}>Historias reales de control financiero</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>“</div>
            <p>No sabía cuánto se me iba en gastos pequeños hasta que usé Finkit. Muy visual y fácil.</p>
            <span>– Mariana, CDMX</span>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>“</div>
            <p>Pude ver mi resumen de gastos por categoría en segundos. Súper útil para organizarme.</p>
            <span>– Usuario anónimo</span>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>“</div>
            <p>Es como tener un asesor financiero, pero automático. ¡Y sin planillas de Excel!</p>
            <span>– Carlos G.</span>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className={styles.section}>
        <h2>¿Cómo funciona?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div style={{ fontSize: '2rem' }}>📤</div>
            <strong>1. Sube tu estado de cuenta</strong>
            <p>Desde Banorte o BBVA, directo desde tu celular.</p>
          </div>
          <div className={styles.card}>
            <div style={{ fontSize: '2rem' }}>🤖</div>
            <strong>2. Finkit analiza todo por ti</strong>
            <p>Identificamos tus gastos y los organizamos por categoría en segundos.</p>
          </div>
          <div className={styles.card}>
            <div style={{ fontSize: '2rem' }}>📊</div>
            <strong>3. Visualiza y toma el control</strong>
            <p>Consulta tu dashboard y entiende en qué estás gastando tu dinero.</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className={`${styles.section} ${styles.lightPurple}`}>
        <h2>Tu dinero, tus reglas. Nosotros solo lo hacemos más fácil.</h2>
        <a href="/suscripcion">Ver mi resumen financiero</a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div>
            <a href="/privacidad" style={{ marginRight: '1rem' }}>Política de Privacidad</a>
            <a href="mailto:hola@finkit.app">Contacto</a>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="https://twitter.com/tuusuario" target="_blank" rel="noopener noreferrer">
              <img src="/assets/img/x.svg" alt="X" width="24" height="24" />
            </a>
            <a href="https://www.instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">
              <img src="/assets/img/instagram.svg" alt="Instagram" width="24" height="24" />
            </a>
            <a href="https://www.facebook.com/tuusuario" target="_blank" rel="noopener noreferrer">
              <img src="/assets/img/facebook.svg" alt="Facebook" width="24" height="24" />
            </a>
            <a href="https://www.tiktok.com/@tuusuario" target="_blank" rel="noopener noreferrer">
              <img src="/assets/img/tiktok.svg" alt="Tiktok" width="24" height="24" />
            </a>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#888' }}>
            © {new Date().getFullYear()} Finkit
          </div>
        </div>
      </footer>
    </main>
  );
}
