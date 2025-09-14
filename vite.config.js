import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  preview: {
    host: '0.0.0.0',                     // cho phép truy cập từ Render
    port: process.env.PORT || 4173,      // dùng cổng Render cấp
    allowedHosts: ['.onrender.com']      // cho phép domain *.onrender.com
  }
})
