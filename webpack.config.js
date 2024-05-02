// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve, dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
  entry: {
    app: './src/index.js',
    page2: './src/page2/index.js',
  },
  devtool: 'inline-source-map',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    open: false,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/templates/index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'page2.html',
      template: 'src/templates/page2.html',
      chunks: ['page2'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
