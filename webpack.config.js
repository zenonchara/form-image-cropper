const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js',
        chunkFilename: '[id].js',
        publicPath: ''
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname + '/src'),
        path.resolve(__dirname + '/node_modules')
      ]
    },
    module: {
        rules: [
            {
				test: [/\.scss$/],
				loader: [
					"style-loader",
					"css-loader",
                    { loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    { loader: "sass-loader",
                        options: {
                            sourceMap: true, sassOptions: {
                                outputStyle: 'compressed',
                            },
                        }
                    }
				],
				exclude: [
					/css\/core\.scss$/,
					/node_modules/
				]
			},
            { test: /\.(svg|woff|woff2|eot|ttf|png)$/, loader: "file-loader?outputPath=assets/" },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					"babel-loader"
				]
			},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};
