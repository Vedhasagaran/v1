'use client';

import { CursorProvider } from '../context/CursorContext';
import { ThemeProvider } from '../context/ThemeContext';
import FluidCursor from './FluidCursor';
import CursorToggle from './CursorToggle';
import ThemeToggle from './ThemeToggle';

export default function CursorWrapper() {
  return (
    <ThemeProvider>
      <CursorProvider>
        <FluidCursor />
        <CursorToggle />
        <ThemeToggle />
      </CursorProvider>
    </ThemeProvider>
  );
}
