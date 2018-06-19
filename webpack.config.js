const path = require('path');

module.exports = {
  entry: {
    watch: './src/content/watch',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['env', 'stage-0', 'react'] },
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
};
