module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://192.168.43.38:5050',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: { '^/api': '' },
        },
      },
    },
  }