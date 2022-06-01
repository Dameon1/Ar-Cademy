// const webpack = require('webpack');

// module.exports = function override(config, env) {
//   console.log('override')
//   config.resolve.fallback = {
//     "crypto": require.resolve("crypto-browserify"),
//     "assert": require.resolve("assert/"),
//     "stream": require.resolve("stream-browserify"),
//   }

//   config.plugins.push(
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//       Buffer: ['buffer', 'Buffer'],
//     }),
//   );

//   return config
// }

const webpack = require('webpack');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "zlib": require.resolve("browserify-zlib"),
    "buffer": require.resolve("buffer"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url")
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
