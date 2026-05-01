import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  css: {
    transformer: 'lightningcss',
  },
  plugins: [tailwindcss()],
});
