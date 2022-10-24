/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 17:03:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-10-12 15:43:04
 * @Description:
 */
import Mock from 'mockjs'
import { IConfig } from '../interface'
import { getURLParams } from '@/utils/core'

const loginData = Mock.mock({
	token: '@lower(@guid)',
})

const accountInfo = Mock.mock({
	name: '@cname',
	gender: '@pick([1, 2])',
	avatar: 'https://***.jpg',
	email: '@email',
	mobilePhone: /^1[345789]\d{9}$/,
	roles: [1],
	// 路由权限表
	// 如果配置了一级路由，则它之下的所有子路由都可访问。
	permission: [
		{
			id: 1,
			name: 'dashboard',
			discriptiong: '首页',
			reminder: '您没有权限访问首页',
		},
		{
			id: 2,
			name: 'cabinAllocation',
		},
		{
			id: 3,
			name: 'user',
		},
		{
			id: 4,
			name: 'demo',
		},
	],
})

export default {
	login(config: IConfig) {
		const { account } = JSON.parse(config.body)
		if (account === 'editor') {
			loginData.token = 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c'
		} else if (account === 'guest') {
			loginData.token = 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420'
		} else {
			loginData.token = '6f81bbab-5b7e-abfb-bd44-efd5aeee82cc'
		}
		return {
			code: 0,
			data: loginData,
		}
	},
	logout() {
		return {
			code: 200,
			data: {},
		}
	},
	getAccountInfo(config: IConfig) {
		const { token } = getURLParams(config.url)
		if (token === 'd02fd62b-cfdf-9efb-adfb-7fc1e85bf99c') {
			accountInfo.roles = [3]
		} else if (token === 'ecfe1e6b-cba6-dfee-fdba-12015b7f2420') {
			accountInfo.roles = [2]
		} else {
			accountInfo.roles = [1]
		}
		return {
			code: 0,
			data: accountInfo,
		}
	},
}
