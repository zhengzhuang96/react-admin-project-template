/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-27 15:23:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-10-24 18:16:49
 * @Description:
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './components/Avatar'
import logo from '@/assets/images/logo.png'
import './style.less'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface IProps {
	isMobile: boolean
	toggle: any
	collapse: boolean
}

const HeaderBar: React.FC<IProps> = ({ isMobile, toggle, collapse }) => {
	return (
		<div className="header-bar">
			<div className="side-bar__logo">
				{!isMobile ? (
					<Link to="/dashboard/index">
						{/* <img className="image" src={logo} alt="" /> */}
						<span className="title">react admin pro</span>
					</Link>
				) : (
					React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'header-bar-trigger',
						onClick: toggle,
					})
				)}
			</div>
			<Avatar />
		</div>
	)
}

export default HeaderBar
