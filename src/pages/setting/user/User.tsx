import React, { useEffect, useState, useCallback } from 'react'
import { Button, Divider, Input, Row, Col, Modal, Popconfirm, Table } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import constantMng from '@/utils/constant-mng'
import Edit from './components/Edit'
import { IUser } from './model'
import service, { IParams } from './service'
import './style.less'

const { Column } = Table

const User = () => {
	// 查询参数
	const [params, setParams] = useState<IParams>({
		pageNumber: 1,
		pageSize: 10,
	})
	// 表格当前页显示的数据
	const [list, setList] = useState<IUser[]>([])
	// 数据总数
	const [total, setTotal] = useState(0)
	// 表格loading状态
	const [loading, setLoading] = useState(false)
	// 编辑模态窗是否显示
	const [editVisible, setEditVisible] = useState(false)
	// 多选的表格行
	const [selectedRows, setSelectedRows] = useState<IUser[]>([])
	// 当前正在编辑的用户的id
	const [userId, setUserId] = useState<number>(0)

	const getUserList = useCallback(async () => {
		setLoading(true)
		const res = await service.getUserList(params)
		setLoading(false)
		setList(res.list)
		setTotal(res.total)
	}, [params])

	// 获取用户列表
	useEffect(() => {
		// getUserList()
	}, [getUserList])

	// 搜索
	const handleSearch = (keyword: string) => {
		setParams(state => ({ ...state, keyword }))
	}

	// 翻页
	const handlePagination = (pageNumber: number, pageSize?: number) => {
		setParams(state => ({ ...state, pageNumber, pageSize: pageSize! }))
	}

	// 新增或编辑
	const handleEdit = (id: number) => {
		setEditVisible(true)
		setUserId(id)
	}

	// 单个删除
	const handleDeleteSingle = async (record: IUser) => {
		const { id, name } = record
		await service.deleteUser(id)
		$message.success(`成功删除用户“${name}”！`)
		//  getUserList()
	}

	// 批量删除
	const handleDeleteBatch = () => {
		if (selectedRows.length > 0) {
			const ids = selectedRows.map(row => row.id)
			const names = selectedRows.map(row => row.name).join('，')
			Modal.confirm({
				title: '确认删除以下用户吗?',
				content: names,
				onOk: async () => {
					await service.deleteUser(ids)
					$message.success(`成功删除用户“${names}”！`)
					//  getUserList()
				},
			})
		} else {
			$message.warning('请选择要删除的用户')
		}
	}

	// 多选
	const handleChangeRows = (selectedRowKeys: React.ReactText[], selectedRows: IUser[]) => {
		setSelectedRows(selectedRows)
	}

	// 取消
	const handleClose = () => {
		setEditVisible(false)
	}

	return (
		<div className="page-user">
			<Row justify="space-between">
				<Col>
					<div className="section-title">
						<span className="section-title__tag" />
						<span className="section-title__name">用户列表</span>
					</div>

					<Button.Group>
						<Button type="primary" icon={<PlusOutlined />} onClick={handleEdit.bind(null, 0)}>
							新增用户
						</Button>
						<Button danger={true} icon={<MinusOutlined />} onClick={handleDeleteBatch}>
							批量删除
						</Button>
					</Button.Group>
				</Col>

				<Col>
					<Input.Search placeholder="请输入查询关键词" onSearch={handleSearch} enterButton={true} />
				</Col>
			</Row>

			<Table<IUser>
				dataSource={list}
				rowKey="id"
				rowSelection={{ onChange: handleChangeRows }}
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
					render={(value, record, index) => (params.pageNumber - 1) * params.pageSize + index + 1}
				/>
				<Column title="姓名" dataIndex="name" />
				<Column title="年龄" dataIndex="age" />
				<Column title="性别" dataIndex="gender" render={value => constantMng.getNameById('gender', value)} />
				<Column<IUser>
					title="操作"
					dataIndex="operate"
					width={140}
					render={(value, record) => (
						<div>
							<Button type="link" size="small" onClick={handleEdit.bind(null, record.id)}>
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

			<Edit visible={editVisible} id={userId} onClose={handleClose} />
		</div>
	)
}

export default User
