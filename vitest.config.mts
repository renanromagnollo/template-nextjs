import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    restoreMocks: true,
    fileParallelism: false,
    exclude: [
      ...configDefaults.exclude,
      'tests/helpers',
      'tmp'
    ],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: [
        // Directories
        'node_modules/',
        'tests/',
        // Files
        'src/app/layout.tsx',
      ],
      all: true,
      reportsDirectory: './coverage',
      thresholds: {
        statements: 98,
        branches: 98,
        functions: 98,
        lines: 98
      }
    },
    alias: {
      '@/tests': new URL('./tests/', import.meta.url).pathname,
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
})
