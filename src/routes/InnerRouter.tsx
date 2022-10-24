/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-12 10:11:23
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:52:27
 * @Description:
 */
import React, { lazy, Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/page-loading'
import IRoute from './IRoute'

const Exception404 = lazy(() => import(/* webpackChunkName:"exception-404" */ '@/components/layouts/exception/404'))

interface IProps {
	routeMap: IRoute[]
}

const InnerRouter: React.FC<IProps> = ({ routeMap }) => {
	// 根据路由配置生成路由
	const getRoutes = (routeMap: IRoute[]) => {
		const routes: RouteProps[] = []
		const getRoute = (routeMap: IRoute[]) => {
			routeMap.forEach(config => {
				const { path, component, children } = config
				if (children) {
					getRoute(children)
				} else {
					routes.push({ path, component })
				}
			})
		}
		getRoute(routeMap)
		return routes
	}

	return (
		<Suspense fallback={<PageLoading />}>
			<Switch>
				{getRoutes(routeMap).map((route: RouteProps) => (
					<Route key={route.path + ''} path={route.path} component={route.component} />
				))}
				{/* 跳转404 */}
				<Route path="*" component={Exception404} />
			</Switch>
		</Suspense>
	)
}

export default InnerRouter
