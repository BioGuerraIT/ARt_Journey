import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        ar: 'ar.html'
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
}); 