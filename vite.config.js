import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Don't inline any assets as base64
    rollupOptions: {
      output: {
        // Ensure proper chunking for better caching
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
        // Control asset filenames
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  // Ensure CSS is processed correctly
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});