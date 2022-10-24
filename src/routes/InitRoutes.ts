/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-27 15:23:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:20:24
 * @Description:
 */
import { IPermission } from '@/model/common'
import IRoute from './IRoute'

// 自动引入childRoutes目录里的子路由
const files = require.context('./childRoutes', false, /\.ts$/);
const routeMap: any = [];

files.keys().forEach((key) => {
	const child = files(key).default;
	routeMap.push(child);
});

// 根据路由名称获取可访问的路由表
const filterRouteMap = (routeNames: string[] | undefined, routeMap: IRoute[]) => {
	const acceptedRouteMap: IRoute[] = []
	routeMap.forEach((route: IRoute) => {
		// 如果一级路由的名称存在路由权限表中，则它之下的所有子路由都可访问
		if (routeNames && routeNames.includes(route.name)) {
			acceptedRouteMap.push(route)
		} else {
			// 如果一级路由的名称不在路由权限表中，再看它的哪些子路由名称在路由权限表中
			if (route.children) {
				route.children = filterRouteMap(routeNames, route.children)
				// 如果有子路由可访问，再添加。
				if (route.children.length > 0) {
					acceptedRouteMap.push(route)
				}
			}
		}
	})
	return acceptedRouteMap
}

// 获取可访问的路由表
const InitRoutes = (permission: IPermission[] | undefined) => {
	const routeNames = permission && permission.map(item => item.name)
	return filterRouteMap(routeNames, routeMap)
}

export default InitRoutes
