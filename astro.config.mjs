import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eloquent.es',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  redirects: {
    '/servicios/inventio/': '/servicios/vision-y-estrategia-de-comunicacion/',
    '/servicios/kairos/': '/servicios/preparacion-comunicacion-de-crisis/',
    '/servicios/kanon/': '/servicios/comunicacion-e-inteligencia-artificial/',
    '/servicios/ethos/': '/servicios/reputacion-directiva/',
  },
  integrations: [mdx(), sitemap()],
});
