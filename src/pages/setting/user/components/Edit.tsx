import React, { useEffect, useState } from 'react'
import { Drawer, Form, Input, Radio, Checkbox, Button } from 'antd'
import service from '../service'
import constantMng from '@/utils/constant-mng'

const genderList = constantMng.getGroup('gender')
const roleList: any = constantMng.formatGroup('role', 'value', 'label')

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
}

interface IProps {
	visible: boolean
	id: number
	onClose: () => void
}

const Edit: React.FC<IProps> = props => {
	const { id, visible, onClose } = props
	// 提交时的loading状态
	// const [loading, setLoading] = useState(false)
	const [detail, setDetail] = useState({
		name: '',
		age: '',
		gender: '',
		role: [],
	})

	// 获取用户详情
	useEffect(() => {
		if (!id) return
		service.getUserDetail(id).then(res => {
			setDetail(res)
		})
	}, [id])

	const handleSubmit = () => {
		if (id) {
			$message.success('修改成功')
		} else {
			$message.success('新增成功')
		}
		onClose()
	}

	const handleFinishFailed = () => {
		$message.warning('请按照正确格式填写信息！')
	}

	return (
		<Drawer
			title={`${id ? '修改' : '新增'}用户`}
			width={400}
			visible={visible}
			onClose={onClose}
			footer={null}
			destroyOnClose={true}
		>
			<Form
				layout="horizontal"
				colon
				labelAlign="left"
				{...formItemLayout}
				onFinish={handleSubmit}
				onFinishFailed={handleFinishFailed}
			>
				<Form.Item
					label="姓名"
					name="name"
					initialValue={detail.name}
					rules={[
						{
							required: true,
							message: '请输入用户姓名!',
						},
					]}
				>
					<Input placeholder="请输入姓名" />
				</Form.Item>

				<Form.Item
					label="年龄"
					name="age"
					initialValue={detail.age}
					rules={[
						{
							required: true,
							message: '请输入用户年龄!',
						},
					]}
				>
					<Input placeholder="请输入年龄" />
				</Form.Item>

				<Form.Item
					label="性别"
					name="gender"
					initialValue={detail.gender}
					rules={[
						{
							required: true,
							message: '请选择用户性别!',
						},
					]}
				>
					<Radio.Group>
						{genderList.map(item => (
							<Radio key={item.id} value={item.id}>
								{item.name}
							</Radio>
						))}
					</Radio.Group>
				</Form.Item>

				<Form.Item
					label="角色"
					name="role"
					initialValue={detail.role}
					rules={[
						{
							required: true,
							message: '请至少选择一个用户角色!',
						},
					]}
				>
					<Checkbox.Group options={roleList} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8 }}>
					<Button onClick={onClose}>取消</Button>
					<Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
						确认
					</Button>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export default Edit
