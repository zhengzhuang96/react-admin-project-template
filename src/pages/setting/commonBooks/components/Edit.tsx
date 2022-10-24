import React, { useEffect } from 'react'
import { Drawer } from 'antd'
import service from '../service'
// import constantMng from '@/utils/constant-mng'
import { FooterToolbar, ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { ICommonBooks } from '../model'

interface IProps {
	commonBooksDeatil: ICommonBooks
	visible: boolean
	id: number
	onClose: () => void
}

const Edit: React.FC<IProps> = props => {
	const { commonBooksDeatil, visible, onClose } = props
	console.log(commonBooksDeatil.id, 'id')

	// 提交时的loading状态
	// const [loading, setLoading] = useState(false)
	// const [detail, setDetail] = useState({
	// 	name: '',
	// 	age: '',
	// 	gender: '',
	// 	role: [],
	// })

	// 获取用户详情
	useEffect(() => {
		// if (!commonBooksDeatil.id) return
		// service.getCommonBooksDetail(commonBooksDeatil.id).then(res => {
		// 	setDetail(res)
		// })
	}, [commonBooksDeatil.id])

	// 选择货物类型
	// const handleChange = () => {}

	const handleSubmit = async (values: any) => {
		console.log(values, 'values')
		// $message.success('新增成功')
		if (commonBooksDeatil.id) {
			await service.updateCommonBooks({ ...values, bookType: 1 })
			$message.success('修改成功')
		} else {
			await service.updateCommonBooks({ ...values, bookType: 1, id: commonBooksDeatil.id })

			$message.success('新增成功')
		}
		onClose()
	}

	// const handleFinishFailed = () => {
	// 	$message.warning('请按照正确格式填写信息！')
	// }

	return (
		<Drawer
			title={`${commonBooksDeatil.id ? '修改' : '新增'}托书`}
			width={800}
			visible={visible}
			onClose={onClose}
			footer={null}
			destroyOnClose={true}
		>
			<ProForm
				submitter={{
					render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
				}}
				onFinish={async values => handleSubmit(values)}
			>
				<ProForm.Group>
					<ProFormText
						name="bookingOrderName"
						initialValue={commonBooksDeatil.bookingOrderName}
						width="md"
						label="常用托书"
						tooltip="最长为 24 位"
						placeholder="请输入名称"
					/>
					<ProFormSelect
						options={[
							{
								value: '普通',
								label: '普通',
							},
							{
								value: '危险品',
								label: '危险品',
							},
							{
								value: '冷藏',
								label: '冷藏',
							},
							{
								value: '服装',
								label: '服装',
							},
						]}
						width="md"
						name="cargoType"
						initialValue={commonBooksDeatil.cargoType}
						label="货物类型"
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect
						options={[
							{
								value: 'MB/L',
								label: 'MB/L',
							},
							{
								value: 'HB/L',
								label: 'HB/L',
							},
						]}
						width="md"
						name="ladBillType"
						initialValue={commonBooksDeatil.ladBillType}
						label="提单类型"
					/>
					<ProFormSelect
						options={[
							{
								value: 'FOB',
								label: 'FOB',
							},
							{
								value: 'FCA',
								label: 'FCA',
							},
							{
								value: 'CIF',
								label: 'CIF',
							},
						]}
						width="md"
						name="tradeType"
						initialValue={commonBooksDeatil.tradeType}
						label="交易类型"
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect
						options={[
							{
								value: '正本',
								label: '正本',
							},
							{
								value: '电放',
								label: '电放',
							},
							{
								value: '异地放单',
								label: '异地放单',
							},
							{
								value: 'SEAWAYBILL',
								label: 'SEAWAYBILL',
							},
							{
								value: '目的港放单',
								label: '目的港放单',
							},
						]}
						width="md"
						name="outBillType"
						initialValue={commonBooksDeatil.outBillType}
						label="放货方式"
					/>
					<ProFormSelect
						options={[
							{
								value: 'CY-CY',
								label: 'CY-CY',
							},
							{
								value: 'CY-DOOR',
								label: 'CY-DOOR',
							},
							{
								value: 'DOOR-DOOR',
								label: 'DOOR-DOOR',
							},
						]}
						width="md"
						name="transitClause"
						initialValue={commonBooksDeatil.transitClause}
						label="运输条款"
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormSelect
						options={[
							{
								value: 'FREIGHT COLLECT',
								label: 'FREIGHT COLLECT',
							},
							{
								value: 'FREIGHT PREPAID',
								label: 'FREIGHT PREPAID',
							},
						]}
						width="md"
						name="paymentMethod"
						initialValue={commonBooksDeatil.paymentMethod}
						label="付款方式"
					/>
					<ProFormText
						name="cnTypeName"
						initialValue={commonBooksDeatil.cnTypeName}
						width="md"
						label="中文名称"
						tooltip="最长为 24 位"
						placeholder="请输入名称"
					/>
				</ProForm.Group>
				<ProForm.Group>
					<ProFormText
						name="enTypeName"
						initialValue={commonBooksDeatil.enTypeName}
						width="md"
						label="英文名称"
						tooltip="最长为 24 位"
						placeholder="请输入名称"
					/>
				</ProForm.Group>
				<ProFormTextArea
					width="xl"
					label="收件人地址"
					name="consigneeDetail"
					initialValue={commonBooksDeatil.consigneeDetail}
				/>
				<ProFormTextArea
					width="xl"
					label="发件人地址"
					name="consignorDetail"
					initialValue={commonBooksDeatil.consignorDetail}
				/>
				<ProFormTextArea
					width="xl"
					label="通知人地址"
					name="notifierDetail"
					initialValue={commonBooksDeatil.notifierDetail}
				/>
			</ProForm>
		</Drawer>
	)
}

export default Edit
