/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-21 14:18:20
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-10-24 18:15:44
 * @Description:
 */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import BreadcrumbBar from '../components/layouts/bread-crumb-bar'
import { InitRoutes, InnerRouter, IRoute } from '@/routes'
import HeaderBar from '@/components/layouts/header-bar'
import Nav from '@/components/layouts/nav'
import service from './service'
import './style.less'

const InnerLayout: React.FC = () => {
	const history = useHistory()

	// 是否折叠侧边菜单
	const [collapse, setCollapse] = useState(false)

	// 路由配置
	const [routeMap, setRouteMap] = useState<IRoute[]>([])

	// Drawer状态
	const [visible, setVisible] = useState<any>(false)

	// 是否是移动端
	const [isMobile, setIsMobile] = useState<boolean>(false)

	const {
		user: { token },
	} = useSelector((state: any) => state)

	const {
		user: { setAccountInfo },
	} = useDispatch()

	useEffect(() => {
		if (!token) {
			history.replace('/account/login')
		} else {
			// TODO: 获取路由配置
			service.getAccountInfo({ token }).then(res => {
				setAccountInfo(res)
				setRouteMap(InitRoutes(res.permission))
			})
			// setRouteMap(initRoutes(routeList))
		}

		// 跳转到首页
		if (history.location.pathname === '/') {
			history.push('/dashboard/index')
		}
	}, [history])

	// 窗口变化
	const handleResize = () => {
		document.documentElement.clientWidth < 650 ? setIsMobile(true) : setIsMobile(false)
	}

	useEffect(() => {
		handleResize()
		window.onresize = handleResize
		return () => {
			window.onresize = null
		}
	}, [])

	// 监听路由变化关闭Drawer
	useEffect(() => {
		if (visible) {
			setVisible(false)
		}

		if (!localStorage.getItem('token')) {
			history.replace('/account/login')
		}
	}, [history.location.pathname])

	return (
		<div className="inner-layout">
			<HeaderBar isMobile={isMobile} toggle={setVisible} collapse={collapse} />
			<Layout>
				<Nav
					isMobile={isMobile}
					visible={visible}
					routeMap={routeMap}
					collapse={collapse}
					onClose={() => setVisible(false)}
					triggerCollapse={() => setCollapse(state => !state)}
				/>
				<Layout id="layoutMain" className="inner-layout__main">
					{routeMap.length !== 0 && <BreadcrumbBar routeMap={routeMap} />}
					<Layout.Content className="content">
						{routeMap.length !== 0 && <InnerRouter routeMap={routeMap} />}
					</Layout.Content>
					<div className="copyright">
						<span>copyright @ 2022 github/zhengzhuang版权所有</span>
					</div>
					<BackTop
						style={{ right: '50px' }}
						target={() => document.getElementById('layoutMain')!}
						visibilityHeight={600}
					/>
				</Layout>
			</Layout>
		</div>
	)
}

export default InnerLayout
