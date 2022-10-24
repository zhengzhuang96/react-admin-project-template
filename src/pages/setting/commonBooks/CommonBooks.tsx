import React, { useEffect, useState, useCallback } from 'react'
import { Button, Divider, Row, Col, Popconfirm, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Edit from './components/Edit'
import { ICommonBooks } from './model'
import service, { IParams } from './service'
import './style.less'

const { Column } = Table

const CommonBooks = () => {
	// 查询参数
	const [params, setParams] = useState<IParams>({
		current: 1,
		size: 10,
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<ICommonBooks[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)
	// 编辑模态窗是否显示
	const [editVisible, setEditVisible] = useState(false)
	// 当前正在编辑的用户的详情
	const detailEmpty = {
		bookingOrderName: '',
		bookingOrderNo: '',
		cargoType: '',
		cnTypeName: '',
		consigneeDetail: '',
		consignorDetail: '',
		enTypeName: '',
		ladBillType: '',
		notifierDetail: '',
		outBillType: '',
		paymentMethod: '',
		transactionType: '',
		transitClause: '',
		id: '',
		tradeType: '',
	}
	const [commonBooksDeatil, setCommonBooksDetail] = useState<ICommonBooks>(detailEmpty)

	const getCommonBooksList = useCallback(async () => {
		setLoading(true)
		const res = await service.getCommonBooksList(params)
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [params])

	// 获取用户列表
	useEffect(() => {
		getCommonBooksList()
	}, [getCommonBooksList])

	// 搜索
	// const handleSearch = (keyword: string) => {
	// 	setParams(state => ({ ...state, keyword }))
	// }

	// 翻页
	const handlePagination = (current: number, size?: number) => {
		setParams(state => ({ ...state, current, size: size! }))
	}

	// 新增或编辑
	const handleEdit = (record: ICommonBooks) => {
		setEditVisible(true)
		setCommonBooksDetail(record)
	}

	// 单个删除
	const handleDeleteSingle = async (record: ICommonBooks) => {
		const { id } = record
		await service.deleteCommonBooks([id])
		$message.success('成功删除用户！')
		getCommonBooksList()
		//  getCommonBooksList()
	}

	// 取消
	const handleClose = () => {
		setEditVisible(false)
		getCommonBooksList()
	}

	return (
		<div className="page-commonBooks">
			<Row justify="space-between">
				<Col>
					<Button.Group>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleEdit.bind(null, detailEmpty)}>
							新增托书
						</Button>
					</Button.Group>
				</Col>
			</Row>

			<Table<ICommonBooks>
				dataSource={list}
				rowKey="id"
				loading={loading}
				scroll={{ x: 1600 }}
				pagination={{
					total,
					// useFixedHeader: true,
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
				<Column title="托书编号" dataIndex="bookingOrderNo" />
				<Column title="托书名称" dataIndex="bookingOrderName" />
				<Column title="货物类型" dataIndex="cargoType" />
				<Column title="提单类型" dataIndex="ladBillType" />
				<Column title="交易类型" dataIndex="transactionType" />
				<Column title="放货方式" dataIndex="outBillType" />
				<Column title="运输条款" dataIndex="transitClause" />
				<Column title="付款方式" dataIndex="paymentMethod" />
				<Column title="收件人信息" dataIndex="consigneeDetail" />
				<Column title="发件人信息" dataIndex="consignorDetail" />
				<Column title="通知人信息" dataIndex="notifierDetail" />
				<Column title="中文品名" dataIndex="cnTypeName" />
				<Column title="英文品名" dataIndex="enTypeName" />
				<Column<ICommonBooks>
					title="操作"
					dataIndex="operate"
					width={140}
					fixed="right"
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

			<Edit visible={editVisible} commonBooksDeatil={commonBooksDeatil} onClose={handleClose} id={0} />
		</div>
	)
}

export default CommonBooks
