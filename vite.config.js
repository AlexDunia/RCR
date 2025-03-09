import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',  // Changed to relative path for better GitHub Pages support
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true
  }
});
