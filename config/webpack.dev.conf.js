/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-09 18:00:39
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-24 16:11:27
 * @Description:
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const resolve = dir => path.resolve(process.cwd(), dir)

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	cache: { type: 'filesystem' },
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		host: '127.0.0.1', // 服务ip
		port: '3000', // 服务端口
		static: {
			directory: resolve(__dirname, '../public'),
		}, // 服务器所加载文件的目录
		compress: true,
		open: true,
		hot: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
	plugins: [
		// 需要分析bundle的时候打开, 来分析打包体积
		// new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
		// 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
		// new webpack.HotModuleReplacementPlugin(),
		// 增加编译缓存 webpack5暂不支持
		// new HardSourceWebpackPlugin({
		// 	cacheDirectory: '../node_modules/.cache/hard-source/[confighash]',
		// 	configHash: function (webpackConfig) {
		// 		return require('node-object-hash')({ sort: false }).hash(webpackConfig)
		// 	},
		// 	environmentHash: {
		// 		root: process.cwd(),
		// 		directories: [],
		// 		files: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'],
		// 	},
		// 	cachePrune: {
		// 		maxAge: 7 * 24 * 60 * 60 * 1000,
		// 		sizeThreshold: 100 * 1024 * 1024,
		// 	},
		// }),
	],
})
