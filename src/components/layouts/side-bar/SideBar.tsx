/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-09 18:00:39
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:52:30
 * @Description: 侧边菜单
 */
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { Menu } from 'antd'
import { IRoute } from '@/routes'
import Icon from '@/components/icon'

interface IProps {
	routeMap: IRoute[]
	collapse: boolean
}

/**
 * @description: 侧边菜单
 * @param {any} props
 */
const renderThumb = (props: any) => {
	const { style, ...rest } = props

	const thumbStyle: React.CSSProperties = {
		backgroundColor: 'rgba(255,255,255,.2)',
		borderRadius: '3px',
		cursor: 'pointer',
	}

	return <div style={{ ...style, ...thumbStyle }} {...rest} />
}

const SiderBar: React.FC<IProps> = ({ routeMap, collapse }) => {
	const location = useLocation()
	const history = useHistory()

	// 当前激活的菜单
	const [activeMenu, setActiveMenu] = useState('')

	// 当前激活的菜单数组
	const [activeMenuArr, setActiveMenuArr] = useState<string[]>([])

	useEffect(() => {
		const activeMenuArr = location.pathname.split('/').filter(Boolean)
		setActiveMenuArr(activeMenuArr)
		setActiveMenu(activeMenuArr[activeMenuArr.length - 1])
	}, [location.pathname])

	const [menuList]: Array<any> = useState(
		routeMap.map(ele => {
			return {
				key: ele.key,
				icon: ele.icon && <Icon name={ele.icon} />,
				label: ele.label,
				onClick: ele.children ? null : () => history.push(ele.path),
				children: ele.children?.map((item: any) => {
					return {
						path: item.path,
						key: item.key,
						label: item.label,
						onClick: () => history.push(item.path),
					}
				}),
			}
		})
	)

	return (
		<Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
			{activeMenuArr && activeMenuArr.length > 0 && (
				<Menu
					theme="light"
					mode="inline"
					defaultOpenKeys={activeMenuArr}
					defaultSelectedKeys={[activeMenu]}
					items={menuList}
				/>
			)}
		</Scrollbars>
	)
}

export default SiderBar
