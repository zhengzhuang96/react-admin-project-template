import { ICustomer } from './model'

export interface IParams {
	keyword?: string
	current: number
	size: number
}

// 获取用户列表
const getCustomerList = async (params: IParams): Promise<{ list: ICustomer[]; total: number }> => {
	const result = await $request.get('/api/biz/customerManagement/queryCustomerManagementPage', params)
	return {
		list: result.records,
		total: result.total,
	}
}
// 获取用户详情
const getCustomerDetail = (id: String) =>
	$request.post('/api/biz/vesselScheduleContainer/blurredQueryVesselName', { id })

// 编辑/新增用户
const updateCustomer = (detail: ICustomer) =>
	$request.post('/api/biz/customerManagement/saveCustomerManagement', { ...detail })

// 删除用户/customerManagement/deleteCustomerManagerByIds
const deleteCustomer = (ids: String | String[]) =>
	$request.post('/api/biz/customerManagement/deleteCustomerManagerByIds', { ids })

export default {
	getCustomerList,
	getCustomerDetail,
	updateCustomer,
	deleteCustomer,
}
