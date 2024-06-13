import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 以下、本番環境でうまく動作しないため要調査
  // App.jsxにurlを直書きすることで問題なく動作した
  server: {
    proxy: {
      '/search': {
        target: 'https://rakuten-api-proxy-practice-backend.kagome.workers.dev',
        changeOrigin: true,
      }
    }
  }
})
