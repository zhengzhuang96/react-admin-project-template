/*
 * @Author: {zhengzhuang}
 * @Date: 2022-05-30 17:58:07
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:48:28
 * @Description:
 */

interface ILoader {
	filePath: string
	nameSpace: string
	model: any
}

// 所有模块集合
const models = {}

// 添加model
const addModel = ({ filePath, nameSpace, model }: ILoader) => {
	// 命名空间值必填
	if (!nameSpace) {
		console.error(`${filePath} 缺少 nameSpace`)
		return
	}
	// 防止命名空间相同
	if (models[nameSpace]) {
		console.error(`${filePath} 的nameSpace与其它model重复`)
		return
	}
	models[nameSpace] = model
}

// 引入当前models文件下内的model
const currentFileModelFiles = require.context('./models', false, /\.ts$/)
currentFileModelFiles.keys().forEach(filePath => {
	// src/store/models下的model 使用文件名作为model的nameSpace 但其它地方 必须添加nameSpace
	const nameSpace = filePath.replace(/(\.\/|\.ts)/g, '')
	const model = currentFileModelFiles(filePath).default
	addModel({ filePath, nameSpace, model })
})

// 引入pages内的model
const viewsModelFiles = require.context('../pages', true, /\.model\.ts$/)
viewsModelFiles.keys().forEach(filePath => {
	const model = viewsModelFiles(filePath).default
	const { nameSpace } = model
	addModel({ filePath, nameSpace, model })
})

export default models
