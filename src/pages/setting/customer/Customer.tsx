import React, { useEffect, useState, useCallback } from 'react'
import { Button, Divider, Row, Col, Popconfirm, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import constantMng from '@/utils/constant-mng'
import Edit from './components/Edit'
import { ICustomer } from './model'
import service, { IParams } from './service'
import './style.less'

const { Column } = Table

const Customer = () => {
	// 查询参数
	const [params, setParams] = useState<IParams>({
		current: 1,
		size: 10,
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<ICustomer[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)
	// 编辑模态窗是否显示
	const [editVisible, setEditVisible] = useState(false)
	// 多选的表格行
	// const [selectedRows, setSelectedRows] = useState<ICustomer[]>([])
	const custormEmpty = {
		enterpriseName: '',
		enterpriseCode: '',
		contactName: '',
		contactPhone: '',
		id: '',
	}
	// 当前正在编辑的用户的id
	const [customerDetail, setCustomerDetail] = useState<ICustomer>(custormEmpty)

	// const [detail, setDetail] = useState({
	// 	enterpriseName: '',
	// 	enterpriseCode: '',
	// 	contactName: '',
	// 	contactPhone: '',
	// 	id: '',
	// })

	const getCustomerList = useCallback(async () => {
		setLoading(true)
		const res = await service.getCustomerList(params)
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [params])

	// 获取用户列表
	useEffect(() => {
		getCustomerList()
	}, [getCustomerList])

	// 翻页
	const handlePagination = (current: number, size?: number) => {
		setParams(state => ({ ...state, current, size: size! }))
	}

	// 新增或编辑
	const handleEdit = (record: ICustomer) => {
		setEditVisible(true)
		setCustomerDetail(record)
	}

	// 单个删除
	const handleDeleteSingle = async (record: ICustomer) => {
		const { id } = record
		await service.deleteCustomer([id])
		$message.success('成功删除用户！')
		getCustomerList()
		//  getCustomerList()
	}

	// 取消
	const handleClose = () => {
		getCustomerList()
		setEditVisible(false)
	}

	return (
		<div className="page-customer">
			<Row justify="space-between">
				<Col>
					<div className="section-title">
						<span className="section-title__tag" />
						<span className="section-title__name">用户列表</span>
					</div>

					<Button.Group>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleEdit.bind(null, custormEmpty)}>
							新增用户
						</Button>
						{/* <Button danger={true} icon={<MinusOutlined />} onClick={handleDeleteBatch}>
							批量删除
						</Button> */}
					</Button.Group>
				</Col>

				{/* <Col>
					<Input.Search placeholder="请输入查询关键词" onSearch={handleSearch} enterButton={true} />
				</Col> */}
			</Row>

			<Table<ICustomer>
				dataSource={list}
				rowKey="id"
				// rowSelection={{ onChange: handleChangeRows }}
				loading={loading}
				pagination={{
					total,
					showQuickJumper: true,
					showSizeChanger: true,
					showTotal: total => `共${total}个用户`,
					onChange: handlePagination,
				}}
			>
				<Column
					title="序号"
					dataIndex="number"
					width={80}
					render={(value, record, index) => (params.current - 1) * params.size + index + 1}
				/>
				<Column title="企业编码" dataIndex="enterpriseCode" />
				<Column title="企业名称" dataIndex="enterpriseName" />
				<Column title="联系人" dataIndex="contactName" />
				{/* <Column title="性别" dataIndex="gender" render={value => constantMng.getNameById('gender', value)} /> */}
				<Column<ICustomer>
					title="操作"
					dataIndex="operate"
					width={140}
					render={(value, record) => (
						<div>
							<Button type="link" size="small" onClick={handleEdit.bind(null, record)}>
								编辑
							</Button>
							<Divider type="vertical" />
							<Popconfirm title="确定删除这条数据吗？" onConfirm={handleDeleteSingle.bind(null, record)}>
								<Button type="link" size="small" danger={true}>
									删除
								</Button>
							</Popconfirm>
						</div>
					)}
				/>
			</Table>

			<Edit visible={editVisible} customerDetail={customerDetail} onClose={handleClose} />
		</div>
	)
}

export default Customer
