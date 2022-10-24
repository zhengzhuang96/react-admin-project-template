import { ICommonBooks } from './model'

export interface IParams {
	keyword?: string
	current: number
	size: number
}

// 获取用户列表http://192.168.64.9:8960/api/biz/customerBookingOrderTemplate/queryCustomerBookingOrderTemplatePage
const getCommonBooksList = async (params: IParams): Promise<{ list: ICommonBooks[]; total: number }> => {
	const result = await $request.get(
		'/api/biz/customerBookingOrderTemplate/queryCustomerBookingOrderTemplatePage',
		params
	)
	return {
		list: result.records,
		total: result.total,
	}
}
// 获取用户详情
const getCommonBooksDetail = (id: number) => $request.post('/commonBooks/detail', { id })

// 编辑/新增用户http://192.168.64.9:8960/api/biz/customerBookingOrderTemplate/saveCustomerBookingOrderTemplate
const updateCommonBooks = (detail: ICommonBooks) =>
	$request.post('api/biz/customerBookingOrderTemplate/saveCustomerBookingOrderTemplate', { ...detail })

// 删除用户http://192.168.64.9:8960/api/biz/customerBookingOrderTemplate/deleteCustomerBookingOrderTemplateByIds
const deleteCommonBooks = (ids: String | String[]) =>
	$request.post('/api/biz/customerBookingOrderTemplate/deleteCustomerBookingOrderTemplateByIds', { ids })

export default {
	getCommonBooksList,
	getCommonBooksDetail,
	updateCommonBooks,
	deleteCommonBooks,
}
