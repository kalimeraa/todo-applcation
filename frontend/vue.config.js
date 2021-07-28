module.exports = {
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      "/api": {
        target: `http://${process.env.API_ENDPOINT}:5000`
      }
    }
  }
};
