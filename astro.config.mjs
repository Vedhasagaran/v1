import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap()
  ],

  site: 'https://vedhasagaran.dev',
  compressHTML: true,

  build: {
    inlineStylesheets: 'auto'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});