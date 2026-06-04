import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

const CERT_PATH = './192.168.1.10.pem'
const KEY_PATH  = './192.168.1.10-key.pem'
const hasHttps  = fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    ...(hasHttps && {
      https: {
        key:  fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH),
      }
    }),
    port: 5173
  }
})
