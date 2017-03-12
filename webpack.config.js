var webpack = require("webpack");

module.exports = {
  entry: './app-client.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  devServer: {
      historyApiFallback: true,
      hot: true,
   	  publicPath: '/'
  },
  module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"]
			}
        ]
    }
}