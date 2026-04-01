import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: 'react.html',
  },
  build: {
    rollupOptions: {
      input: {
        crud: 'react.html',
        // spa: 'spa.html',
        // axios: 'axios.html',
      },
    },
  },
});
