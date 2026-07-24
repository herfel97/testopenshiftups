import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const serveTestEntry: Plugin = {
  name: 'serve-test-entry',
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === '/test') {
        request.url = '/test/'
      }
      next()
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === '/test') {
        request.url = '/test/'
      }
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: '/test/',
  plugins: [serveTestEntry, react()],
})
