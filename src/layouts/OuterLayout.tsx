/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-12 14:26:23
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:41:19
 * @Description:
 */
import React from 'react'
import { OuterRouter } from '@/routes'
import './style.less'

const OuterLayout: React.FC = () => {
	return (
		<div className="outer-layout">
			<OuterRouter />
		</div>
	)
}

export default OuterLayout
