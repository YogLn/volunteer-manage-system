import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
  base: './',
  plugins: [vue()],
  optimizeDeps: {
    include: []
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  }
}
