import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/search': {
          target: env.VITE_SERVER_URL_FOR_CONFIG,
          changeOrigin: true
        }
      }
    }
  }
})
