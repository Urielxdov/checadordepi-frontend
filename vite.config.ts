import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('./192.168.1.10-key.pem'),
      cert: fs.readFileSync('./192.168.1.10.pem'),
    },
    port: 5173
  }
})
