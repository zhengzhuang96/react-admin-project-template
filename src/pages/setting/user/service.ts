import { IUser } from './model'

export interface IParams {
	keyword?: string
	pageNumber: number
	pageSize: number
}

// 获取用户列表
const getUserList = async (params: IParams): Promise<{ list: IUser[]; total: number }> => {
	const result = await $request.post('/user/list', params)
	return {
		list: result.list,
		total: result.total,
	}
}
// 获取用户详情
const getUserDetail = (id: number) => $request.post('/user/detail', { id })

// 编辑/新增用户
const updateUser = (detail: IUser) => $request.post('/user/update', { detail })

// 删除用户
const deleteUser = (id: number | number[]) => $request.post('/user/delete', { id })

export default {
	getUserList,
	getUserDetail,
	updateUser,
	deleteUser,
}
