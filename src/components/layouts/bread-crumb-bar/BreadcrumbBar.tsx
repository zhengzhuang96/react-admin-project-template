/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-10 10:25:19
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:15:46
 * @Description:
 */
import React from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { getNodeRoute } from '@/utils'
import { IRoute } from '@/routes'
import './index'

interface IProps {
	routeMap: IRoute[]
}

/**
 * @description: 面包屑
 */
const BreadcrumbBar: React.FC<IProps> = ({ routeMap }) => {
	const location = useLocation()

	const pathSnippets = location.pathname.split('/').filter(i => i)

	const urls = `/${pathSnippets.slice(0).join('/')}`

	const path = getNodeRoute(routeMap, urls)

	const extraBreadcrumbItems = path.map((item: any) => (
		<Breadcrumb.Item key={item.path}>
			{/* <Link to={item.path}>{item.label}</Link> */}
			{item.label}
		</Breadcrumb.Item>
	))

	return <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
}

export default BreadcrumbBar
