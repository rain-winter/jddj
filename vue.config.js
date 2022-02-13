module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.wanandroid.com/',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: 'https://www.fastmock.site/mock/591e528fbe1d8df962936a25d6cbd99b/api',
        changeOrigin: true,
        ws: true,
        secure: true,
        pathRewrite: {
          '^/mock': ''
        }
      }
    }
  }
}
