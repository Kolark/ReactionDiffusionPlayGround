// vite.config.js
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs'
  },
  plugins: [glsl()]
});