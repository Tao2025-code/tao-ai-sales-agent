import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Ensure assets resolve correctly when served from the GitHub Pages subpath.
  base: '/tao-ai-sales-agent/',
  plugins: [react()],
})
