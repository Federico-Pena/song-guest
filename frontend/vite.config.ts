import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import { cwd } from 'process'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Song Guessing Game',
        short_name: 'Song Guess',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        scope: '/',
        start_url: '.',
        lang: 'en',
        icons: [
          {
            src: 'assets/icons/favicon.ico',
            type: 'image/x-icon',
            sizes: '16x16 32x32'
          },
          {
            src: 'assets/icons/icon-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'assets/icons/icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: 'assets/icons/icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable'
          },
          {
            src: 'assets/icons/icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    outDir: path.join(cwd(), '../backend/build'),
    emptyOutDir: true
  }
})
