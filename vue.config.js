const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  publicPath: "/",
  css: {
    sourceMap: true
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
};
