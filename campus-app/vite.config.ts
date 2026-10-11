import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Собирается в ../vuzy → https://<user>.github.io/Ventorme/vuzy/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: '../vuzy', emptyOutDir: true },
  server: { port: 5173 },
})
