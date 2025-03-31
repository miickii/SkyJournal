import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SkyJournal/',
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
