/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 14:54:01
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:48:52
 * @Description:
 */

/**
 * @description: 应用配置
 */
const CONFIG_BASE = {
	// html的tite
	htmlTitle: 'react-ts - {title}',
}

/**
 * @description: 开发配置
 */
const CONFIG_DEV = {
	domain: 'http://localhost:8090',
}

/**
 * @description: 测试配置
 */
const CONFIG_TEST = {
	domain: 'http://api',
}

/**
 * @description: 生产配置
 */
const CONFIG_PRO = {
	domain: 'https://api',
}

const ENV_CONFIG_MAP = {
	development: CONFIG_DEV,
	test: CONFIG_TEST,
	production: CONFIG_PRO,
}

export default { ...CONFIG_BASE, ...ENV_CONFIG_MAP[process.env.NODE_ENV!] }
