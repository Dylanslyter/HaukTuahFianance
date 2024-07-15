import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['/src/main.jsx'],
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});





