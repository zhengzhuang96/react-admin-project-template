/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-12 14:26:23
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:52:37
 * @Description:
 */
import React, { lazy, Suspense } from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PageLoading from '@/components/page-loading'

const Login = lazy(() => import(/* webpackChunkName:"login" */ '@/pages/account/login'))

const routes: RouteProps[] = [
	{
		path: '/account/login',
		component: Login,
	},
]

const OuterRouter: React.FC = () => (
	<Suspense fallback={<PageLoading />}>
		<Switch>
			{routes.map((route: RouteProps) => (
				<Route key={route.path + ''} path={route.path} component={route.component} />
			))}
		</Switch>
	</Suspense>
)

export default OuterRouter
