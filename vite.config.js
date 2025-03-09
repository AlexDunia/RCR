import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/RCR/',  // Must match your repository name exactly
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  build: {
    outDir: 'dist'
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
