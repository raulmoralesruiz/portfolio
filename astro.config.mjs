// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.raulmorales.eu',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    sitemap({
      // /proto/* (prototipos) y /original/* (versión anterior, archivada) no son indexables
      filter: (url) => !url.includes('/proto') && !url.includes('/original'),
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // Spanish lives at `/`, English at `/en/`.
      // Astro no hace detección automática por idioma ni redirecciones:
      // el visitante elige explícitamente con el toggle ES/EN.
      prefixDefaultLocale: false,
    },
  },
});
