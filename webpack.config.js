const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Define the entry point for the application
  entry: './src/index.js',  // Change this based on your entry file location

  // Define output options
  output: {
    filename: 'bundle.js',   // The name of the output bundle file
    path: path.resolve(__dirname, 'dist'),  // The output directory for the bundle
    clean: true, // Clean the dist folder before each build
  },

  // Set mode and devtool options
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map', // Optional for easier debugging

  // Module rules for loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Resolve file extensions
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  // Plugins section
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(),
  ],

  // Development server options
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
}
