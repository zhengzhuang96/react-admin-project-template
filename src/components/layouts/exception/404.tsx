/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-12 13:30:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 14:23:56
 * @Description:
 */
import { Button, Result } from 'antd'
import React from 'react'

const Exception404: React.FC = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="对不起，您访问的页面不存在."
			extra={
				<Button type="primary" href="/#/dashboard/index">
					返回首页
				</Button>
			}
		/>
	)
}

export default Exception404
