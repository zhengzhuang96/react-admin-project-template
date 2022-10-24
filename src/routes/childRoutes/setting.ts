/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-27 11:04:29
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:49:30
 * @Description:
 */
import { lazy } from 'react'
import IRoute from '../IRoute'

const User = lazy(() => import(/* webpackChunkName:"user" */ '@/pages/setting/user'))

const route: IRoute = {
	name: 'setting',
	label: '设置',
	icon: 'settings',
	path: '',
	children: [
		{
			name: 'user',
			label: '用户管理',
			path: '/setting/user',
			component: User,
			key: 'user',
			type: 'item',
			props: {},
		},
	],
	key: 'setting',
	type: 'item',
	props: undefined,
}

export default route
