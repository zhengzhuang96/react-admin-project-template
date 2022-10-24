/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-24 09:43:07
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-24 09:43:07
 * @Description:
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const packageName = require('../package.json').name
const devMode = process.env.NODE_ENV === 'development'
const regeneratorRuntime = require('regenerator-runtime').path
const WebpackBar = require('webpackbar')

const resolve = dir => path.resolve(process.cwd(), dir)

module.exports = {
	entry: {
		app: resolve('src/index.tsx'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('public/index.html'),
			filename: 'index.html',
			favicon: 'public/favicon.ico',
			minify: {
				removeAttributeQuotes: true,
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
		new webpack.ProvidePlugin({
			$request: [resolve('src/utils/request.ts'), 'default'],
			$message: [resolve('node_modules/antd/es/message/index.js'), 'default'],
		}),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: resolve('src/assets/images'),
		// 		to: resolve('dist/images'),
		// 	},
		// ]),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:6].css',
			chunkFilename: 'css/[name].[contenthash:6].css',
		}),
		new WebpackBar(),
	],
	module: {
		rules: [
			{
				test: /\.(png|gif|jpe?g|svg|bmp)$/i,
				type: 'asset/resource',
				exclude: resolve('src/assets/icons'),
				generator: {
					filename: 'img/[hash:7].[ext][query]',
				},
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'url-loader'],
				include: resolve('src/assets/icons'),
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash:7].[ext][query]',
				},
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/, /dist/],
				use: [
					'thread-loader',
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							// 使用react-refresh/babel为React项目添加热更新能力, 无需重启服务
							presets: ['react-refresh/babel'],
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(le|c)ss$/,
				use: [
					devMode
						? 'style-loader'
						: {
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../',
								},
						  },
					'css-loader',
					{
						loader: 'less-loader',
						options: { javascriptEnabled: true },
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [resolve('src/assets/styles/variable.less'), resolve('src/assets/styles/mixin.less')],
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'@': resolve('src'),
		},
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
}
