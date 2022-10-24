/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-12 11:19:27
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:52:34
 * @Description:
 */
import React, { FC, lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import PageLoading from '@/components/page-loading'

const InnerLayout = lazy(() => import(/* webpackChunkName:"inner-layout" */ '@/layouts/InnerLayout'))
const OuterLayout = lazy(() => import(/* webpackChunkName:"outer-layout" */ '@/layouts/OuterLayout'))

const Routes: FC = () => {
	return (
		<Router>
			<React.Suspense fallback={<PageLoading />}>
				<Switch>
					<Route path="/account" component={OuterLayout} />
					<Route path="/" component={InnerLayout} />
				</Switch>
			</React.Suspense>
		</Router>
	)
}

export default Routes
