'use client';
import { useEffect } from 'react';

import fluidCursor from './hooks/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const canvas = document.getElementById('fluid');
      if (canvas) {
        fluidCursor();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <canvas id="fluid" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};
export default FluidCursor;
