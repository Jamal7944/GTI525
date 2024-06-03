const webpack = require("webpack");

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  },
  devServer: {
    proxy: {
      '/src/js/bootstrap.bundle.min.js': {
        target: 'http://localhost:8080', // Changer l'URL du serveur si nécessaire
        pathRewrite: {'^/src/js': ''}, // Supprimer la partie du chemin
        changeOrigin: true,
        secure: false,
        onProxyRes: function(proxyRes, req, res) {
          proxyRes.headers['content-type'] = 'text/javascript'; // Changer le type MIME
        }
      }
    }
  }
};
