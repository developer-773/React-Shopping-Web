import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: "./setupTests.js"
  }
})
