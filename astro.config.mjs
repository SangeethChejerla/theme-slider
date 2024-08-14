import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

const oklchToHex = (str) => {
  const DEFAULT_HUE = 250;
  const regex = /-?\d+(\.\d+)?/g;
  const matches = str.string.match(regex);
  const lch = [matches[0], matches[1], DEFAULT_HUE];
  return new Color('oklch', lch).to('srgb').toString({
    format: 'hex',
  });
};
export default defineConfig({
  //site: 'https://.vercel.app/',
  //base: '/',
  //trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
    /* swup({
      theme: false,
      animationClass: 'transition-swup-', // see https://swup.js.org/options/#animationselector
      containers: ['main'],
      smoothScrolling: true,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }), */
  ],

  css: {
    preprocessorOptions: {
      stylus: {
        define: {
          oklchToHex: oklchToHex,
        },
      },
    },
  },
});
