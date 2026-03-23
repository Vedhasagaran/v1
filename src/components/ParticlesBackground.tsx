'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useTheme } from '../context/ThemeContext';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticlesBackgroundProps {
  scopedToContainer?: boolean;
}

export default function ParticlesBackground({ scopedToContainer = false }: Readonly<ParticlesBackgroundProps>) {
  const [init, setInit] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo<ISourceOptions>(() => ({
    fullScreen: {
      enable: false,
    },
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: isDark ? '#a855f7' : '#9333ea', // Purple-500 for dark, Purple-600 for light
      },
      links: {
        color: isDark ? '#ec4899' : '#db2777', // Pink-500 for dark, Pink-600 for light
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), [isDark]);

  if (!init) {
    return null;
  }

  const containerClass = scopedToContainer
    ? 'absolute inset-0 w-full h-full pointer-events-none'
    : 'fixed inset-0 w-full h-full pointer-events-none';

  return (
    <div className={containerClass} style={{ zIndex: 0 }}>
      <Particles
        id="tsparticles"
        options={options}
      />
    </div>
  );
}
