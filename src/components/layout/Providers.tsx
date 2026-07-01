'use client';

import { PreferencesProvider } from '@/contexts/PreferencesContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CursorWrapper from '@/components/effects/CursorWrapper';
import Header from './Header';
import Hero from '@/components/sections/Hero';
import FeedbackBalloons from '@/components/feedback/FeedbackBalloons';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';

interface ProvidersProps {
  skills?: any[];
  showHero?: boolean;
}

export default function Providers({ skills = [], showHero = false }: Readonly<ProvidersProps>) {
  return (
    <PreferencesProvider>
      <ThemeProvider>
        <ScrollProgress />
        <BackToTop />
        <Header />
        <CursorWrapper />
        <FeedbackBalloons />
        {showHero && (
          <>
            <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
              Vedhasagaran - Full Stack Developer Portfolio
            </h1>
            <Hero skills={skills} />
          </>
        )}
      </ThemeProvider>
    </PreferencesProvider>
  );
}
