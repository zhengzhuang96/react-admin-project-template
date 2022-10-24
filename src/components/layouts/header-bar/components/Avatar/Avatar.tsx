/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-09 18:00:39
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:27:22
 * @Description:
 */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import './style.less'

const AvatarMenu: React.FC = () => {
	const history = useHistory()

	const {
		user: { setToken },
	} = useDispatch()

	const {
		user: { name, avatar },
	} = useSelector((state: any) => state)

	const handleMenuClick = ({ key }) => {
		switch (key) {
			case 'mine':
				break
			case 'setting':
				break
			case 'logout':
				setToken('')
				history.replace('/account/login')
				break
			default:
				$message.warning('没有该操作')
		}
	}

	const items = [{ label: '退出登录', key: 'logout' }]

	const getMenuList = () => <Menu items={items} onClick={handleMenuClick} />

	return (
		<Dropdown overlay={getMenuList}>
			<div className="header-bar-avatar">
				<Avatar src={avatar} />
				<div className="username">{name}</div>
			</div>
		</Dropdown>
	)
}

export default AvatarMenu
