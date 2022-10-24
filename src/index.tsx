/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-21 14:18:20
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-07-28 13:37:44
 * @Description:
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import App from './App'
import '@/assets/styles/app.less'
import '@/mock'

ReactDOM.render(
	<ConfigProvider locale={zh_CN}>
		<App />
	</ConfigProvider>,
	document.getElementById('root')
)
