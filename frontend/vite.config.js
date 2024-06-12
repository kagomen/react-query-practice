import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/search': {
  //       target: 'https://rakuten-api-proxy-practice-backend.kagome.workers.dev',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/search/, '/search')
  //     }
  //   }
  // }
})
