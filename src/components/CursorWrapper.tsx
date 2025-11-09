'use client';

import { CursorProvider } from '../context/CursorContext';
import FluidCursor from './FluidCursor';
import CursorToggle from './CursorToggle';

export default function CursorWrapper() {
  return (
    <CursorProvider>
      <FluidCursor />
      <CursorToggle />
    </CursorProvider>
  );
}
