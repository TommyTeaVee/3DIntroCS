import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
 server: {
    proxy: {
      '/proxy-models': {
        target: 'https://d16o5gtkyqkgf2.cloudfront.net',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy-models/, ''),
      },
    },
  },
});