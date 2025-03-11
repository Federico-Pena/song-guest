import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['backend/tests/**'],
    exclude: ['frontend', 'backend', 'node_modules']
  }
})
