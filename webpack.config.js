const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './dist/main.js',
  mode: NODE_ENV,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  node: {
    __dirname: false,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js']
  }
};
