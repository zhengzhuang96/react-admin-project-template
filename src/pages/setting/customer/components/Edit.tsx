import React, { useEffect } from 'react'
import { Drawer, Form, Input, Button } from 'antd'
import service from '../service'
import { ICustomer } from '../model'
// import constantMng from '@/utils/constant-mng'

// const genderList = constantMng.getGroup('gender')
// const roleList: any = constantMng.formatGroup('role', 'value', 'label')

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 20 },
}

interface IProps {
	visible: boolean
	customerDetail: any
	onClose: () => void
}

const Edit: React.FC<IProps> = props => {
	const { customerDetail, visible, onClose } = props

	useEffect(() => {
		// if (customerDetail.id) {
		// 	setDetail(customerDetail)
		// }
		// console.log(customerDetail, 'customerDetail')
		// 	if (!customerDetail.id) return
		// 	service.getCustomerDetail(customerDetail.id).then(res => {
		// 		setDetail(res)
		// 	})
		// console.log({ ...detail })
	}, [customerDetail, visible])

	const handleSubmit = async (params: ICustomer) => {
		if (customerDetail.id) {
			await service.updateCustomer({ ...params, id: customerDetail.id })
			$message.success('修改成功')
		} else {
			await service.updateCustomer(params)

			$message.success('新增成功')
		}
		onClose()
	}

	const handleFinishFailed = () => {
		$message.warning('请按照正确格式填写信息！')
	}

	return (
		<Drawer
			title={`${customerDetail.id ? '修改' : '新增'}用户`}
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
					label="企业名称"
					name="enterpriseName"
					initialValue={customerDetail.enterpriseName}
					rules={[
						{
							required: true,
							message: '请输入企业名称!',
						},
					]}
				>
					<Input placeholder="请输入企业名称" />
				</Form.Item>

				<Form.Item
					label="企业编码"
					name="enterpriseCode"
					initialValue={customerDetail.enterpriseCode}
					rules={[
						{
							required: true,
							message: '请输入企业编码!',
						},
					]}
				>
					<Input placeholder="请输入企业编码" />
				</Form.Item>

				<Form.Item
					label="联系人"
					name="contactName"
					initialValue={customerDetail.contactName}
					rules={[
						{
							required: true,
							message: '请输入联系人!',
						},
					]}
				>
					<Input placeholder="请输入联系人" />
				</Form.Item>

				<Form.Item
					label="联系人电话"
					name="contactPhone"
					initialValue={customerDetail.contactPhone}
					rules={[
						{
							required: true,
							message: '请输入联系人电话!',
						},
					]}
				>
					<Input placeholder="请输入联系人电话" />
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
