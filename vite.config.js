import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: './',  // Relative path for GitHub Pages
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096, // 4kb - smaller files will be inlined as base64
    chunkSizeWarningLimit: 1000, // Increase the warning limit
    cssCodeSplit: true, // Split CSS into multiple files
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'], // Group major libraries
          'tasks': [
            '@/views/tasks/InProgressTasks.vue',
            '@/views/tasks/DraftTasks.vue', 
            '@/views/tasks/CompletedTasks.vue',
            '@/components/task/TaskCreate.vue',
            '@/components/task/TaskDetail.vue'
          ],
          'layouts': ['@/layouts/TasksLayout.vue', '@/layouts/DocumentLayout.vue']
        },
        // Ensure chunk filenames are predictable
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
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
