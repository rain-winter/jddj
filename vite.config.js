import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    build: {
      minify: 'terser', // 默认为esbuild
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除console
          drop_debugger: true, // 生产环境移除debugger
        },
      },
    },
    // 代理
    proxy: {
      '/api': {
        target: 'https://www.wanandroid.com/',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/mock': {
        target:
          'https://www.fastmock.site/mock/591e528fbe1d8df962936a25d6cbd99b/api',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/mock': '',
        },
      },
    },
  },
})
