import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    sourcemap: true,
    minify: true,
    target: 'esnext',
    lib: {
      formats: [
        'cjs',
        'es',
        'umd'
      ],
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `index.${format}.js`,
      name
    },
    rollupOptions: {
      external: [
        'react',
        '@zero-dependency/cookie',
        '@zero-dependency/storage'
      ],
      output: {
        globals: {
          react: 'React',
          '@zero-dependency/cookie': 'cookie',
          '@zero-dependency/storage': 'storage'
        }
      }
    }
  }
})
