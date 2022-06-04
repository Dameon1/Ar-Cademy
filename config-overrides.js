const webpack = require('webpack');

module.exports = function override(config) {
  console.log('config-overrides.js');
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "zlib": require.resolve("browserify-zlib"),
    "buffer": require.resolve("buffer"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
  })
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ])
  return config;
}
