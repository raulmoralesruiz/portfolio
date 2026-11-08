// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // Spanish lives at `/`, English at `/en/`
      prefixDefaultLocale: false,
      // No auto-detection or redirects: the visitor picks explicitly via the toggle
      localeDetection: false,
      redirectToAlternates: false,
    },
  },
});
