/* eslint-disable no-undef */
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fundamentals: resolve(__dirname, '/fundamentals.html'),
        scenegraph: resolve(__dirname, '/scenegraph.html'),
        lights: resolve(__dirname, '/lights.html'),
      },
    },
  },
})
