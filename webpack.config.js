const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                  [
                    '@babel/preset-env',
                    { targets: { node: "current" } },
                  ],
                  '@babel/preset-react',
                ],
            plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
          },
        },
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    compress: true,
    publicPath: '/build/',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
    },
  },
};
