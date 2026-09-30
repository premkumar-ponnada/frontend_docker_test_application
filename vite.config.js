import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 0.0.0.0 so the dev server is reachable from outside a container too.
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})
