import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { cwd } from 'process'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.join(cwd(), '../backend/build'),
    emptyOutDir: true
  }
})
