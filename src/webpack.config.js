// // webpack.config.js

// const webpack = require('webpack');

// module.exports = {
//     // ... 기존 설정
//     plugins: [
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer'],
//         }),
//     ],
//     resolve: {
//         fallback: {
//             "net": false,
//             "tls": false,
//             "http": require.resolve("stream-http"),
//             "https": require.resolve("https-browserify"),
//             "zlib": require.resolve("browserify-zlib"),
//             "stream": require.resolve("stream-browserify"),
//             "buffer": require.resolve("buffer"),
//         }
//     }
// };
