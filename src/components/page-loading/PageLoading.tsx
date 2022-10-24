/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-09 18:00:39
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 13:26:18
 * @Description:
 */
import React from 'react'
import { Spin } from 'antd'

const loadingWrap: React.CSSProperties = {
	paddingTop: '100px',
	textAlign: 'center',
}

const PageLoading: React.FC = () => {
	return (
		<div style={loadingWrap}>
			<Spin size="large" />
		</div>
	)
}
export default PageLoading
