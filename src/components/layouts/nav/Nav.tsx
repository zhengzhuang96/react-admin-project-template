/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-10 20:58:14
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-10 21:17:41
 * @Description:
 */
import React from 'react'
import { Drawer, Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import SideBar from '../side-bar'

interface IProps {
	isMobile: boolean
	visible: boolean
	routeMap: any
	collapse: boolean
	onClose: () => void
	triggerCollapse: () => void
}

/**
 * @description: 侧边栏
 */
const Nav: React.FC<IProps> = ({ isMobile, visible, routeMap, collapse, onClose, triggerCollapse }: any) => {
	return (
		<>
			{/* 侧边栏适配移动端 */}
			{isMobile ? (
				<Drawer
					placement="left"
					width="80%"
					visible={visible}
					onClose={onClose}
					closable={false}
					bodyStyle={{ padding: 0 }}
				>
					{routeMap.length !== 0 && <SideBar routeMap={routeMap} collapse={collapse} />}
				</Drawer>
			) : (
				<Layout.Sider
					breakpoint="lg"
					theme="light"
					className="inner-layout__sider"
					collapsible
					trigger={<div className="trigger_box">{collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>}
					collapsed={collapse}
					onCollapse={triggerCollapse}
				>
					{routeMap.length !== 0 && <SideBar routeMap={routeMap} collapse={collapse} />}
				</Layout.Sider>
			)}
		</>
	)
}

export default Nav
