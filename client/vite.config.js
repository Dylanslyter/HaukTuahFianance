import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure this points to the correct directory
  publicDir: 'public', // Public directory for static assets
  build: {
    outDir: 'build', // Output directory for build files
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});


