import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/
// so every asset URL has to be prefixed with the repo name.
// For a user site (<user>.github.io) or a custom domain, build with VITE_BASE=/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/Ds-project/',
  plugins: [react(), tailwindcss()],
})
