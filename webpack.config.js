var webpack = require('webpack');
var path = require('path');

module.exports = {
  worker: {
    output: {
      filename: "api/programValidator.js"
    }
  },
  entry: {
    'api/programValidator': './src/api/programValidator.js',
    'src/index': './src/index.js',
    css: './src/index.css',
    html: './src/index.html'
  },
  output: { 
    path: path.join(__dirname, "dist"),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      { 
        test: /\.css$/, 
        loader: "file?name=[name].[ext]" 
      }
    ]
  },
  plugins: [
   ],
  devServer: {
    historyApiFallback: true
  }
};

