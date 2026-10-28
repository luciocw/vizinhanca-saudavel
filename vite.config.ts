import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativa: funciona em qualquer nome de repositório no GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
})
