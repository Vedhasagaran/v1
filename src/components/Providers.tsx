'use client';

import { PreferencesProvider } from '../contexts/PreferencesContext';
import { ThemeProvider } from '../context/ThemeContext';
import CursorWrapper from './CursorWrapper';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import FeedbackBalloons from './FeedbackBalloons';
import ScrollProgress from './ScrollProgress';
import BackToTop from './BackToTop';

interface ProvidersProps {
  blogPosts: any[];
  projects: any[];
  skills: any[];
}

export default function Providers({ blogPosts, projects, skills }: Readonly<ProvidersProps>) {
  return (
    <PreferencesProvider>
      <ThemeProvider>
        <ScrollProgress />
        <BackToTop />
        <Header />
        <CursorWrapper />
        <FeedbackBalloons />
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
          Vedhasagaran - Full Stack Developer Portfolio
        </h1>
        <Hero blogPosts={blogPosts} projects={projects} skills={skills} />
        <Footer />
      </ThemeProvider>
    </PreferencesProvider>
  );
}
