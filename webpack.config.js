const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'build.js',
      publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        overlay: true,
        historyApiFallback: true,
    },
	
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader']
			},
			
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
            
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'img',
                }
            },
		]
	},
	
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'build.css'
		}),
        new HtmlWebpackPlugin({
            title: 'Gallery App',
            'meta': {
                'viewport': 'width=device-width, initial-scale=1',
            },
        }),
	]
}