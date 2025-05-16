'use client';

import { Suspense } from 'react';
import SuscripcionContenido from './SuscripcionContenido';

export default function SuscripcionPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuscripcionContenido />
    </Suspense>
  );
}
