/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 17:03:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-11 16:16:38
 * @Description: 首页
 */
import { lazy } from 'react'
import IRoute from '../IRoute'
const Dashboard = lazy(() => import(/* webpackChunkName:"dashboard" */ '@/pages/dashboard'))

const route: IRoute = {
	name: 'dashboard',
	label: '面板管理',
	icon: 'menuHome',
	path: '/dashboard/index',
	key: 'index',
	component: Dashboard,
	type: 'item',
	props: {},
	// children: [
	// 	{
	// 		name: 'index',
	// 		label: '分析面板',
	// 		path: '/dashboard/index',
	// 		component: Dashboard,
	// 		key: 'index',
	// 		type: 'item',
	// 		props: {},
	// 	},
	// ]
}
export default route
