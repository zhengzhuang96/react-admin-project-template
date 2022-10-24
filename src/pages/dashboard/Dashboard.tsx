/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-27 15:23:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-10-24 18:15:13
 * @Description:
 */
import React from 'react'
import welcome from '@/assets/images/welcome-01.png'
import './style.less'

const Dashboard: React.FC = () => {
	return (
		<div className="dashboard">
			<h1>welcome</h1>
			<p>欢迎进入admin平台</p>
			<img src={welcome} alt="" className="welcome" />
		</div>
	)
}

export default Dashboard
