/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 17:03:37
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-11-01 22:24:51
 * @Description: 登陆页 Login
 */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Row, Col, InputNumber, Checkbox } from 'antd'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'
import LoginBanner from '@/assets/images/login-banner.png'
import { createCaptcha } from './util'
import './style.less'

const Login: React.FC = () => {
	const canvasRef = useRef(null)
	const [key, setCaptcha] = useState('')
	const [phone, setPhone] = useState('')

	const {
		user: { fetchLogin },
	} = useDispatch()

	//  获取验证码
	const getCaptcha = () => {
		setCaptcha(createCaptcha(canvasRef.current))
	}

	useEffect(() => {
		getCaptcha()
	}, [])

	return (
		<div className="page-login">
			<Row className="page-row">
				<Col flex="1 1 300px">
					<img src={LoginBanner} alt="" className="LoginBanner" />
				</Col>
				<Col flex="1 1 300px" className="login-box">
					<div className="page-login__title">react-admin demo</div>
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						size="large"
						onFinish={val => fetchLogin({ ...val, key })}
					>
						<Form.Item name="account" rules={[{ required: true, message: '手机号不能为空' }]}>
							<Input type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入手机号" />
						</Form.Item>
						<Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="请输入密码"
							/>
						</Form.Item>
						<Form.Item name="code" rules={[{ required: true, message: '验证码不能为空' }]}>
							<Row>
								<Col span={16}>
									<Input
										type="text"
										prefix={<SafetyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="请输入验证码"
									/>
								</Col>
								<Col span={8} className="login-code-img-box" onClick={getCaptcha}>
									<canvas onClick={getCaptcha} width="80" height="40" style={{ cursor: 'pointer' }} ref={canvasRef} />{' '}
								</Col>
							</Row>
						</Form.Item>
						<Form.Item>
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>记住我</Checkbox>
							</Form.Item>
							{/* <a className="login-form-forgot" href="">
								Forgot password
							</a> */}
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" block className="login-form-button">
								登录
							</Button>
							{/* Or <a href="">register now!</a> */}
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	)
}

export default Login
