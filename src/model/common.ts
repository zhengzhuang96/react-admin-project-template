/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 14:54:01
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:49:20
 * @Description:
 */
// 权限
export interface IPermission {
	id: number
	// 路由权限/按钮权限
	type: 'route' | 'button'
	// 权限名称
	name: string
	// 描述
	description?: string
	// 提示信息
	reminder?: string
}

export interface IAccountInfo {
	roles: string[]
	permission: IPermission[]
	token: string
}

// 用户信息
export interface IUserInfo {
	id?: number
	// 账号
	account?: string
	// 姓名, realname或者nickname
	name?: string
	// 昵称
	nickname?: string
	// 真实姓名
	realname?: string
	// 角色
	roles: number[]
	// 性别
	gender?: number
	// 年龄
	age?: number
	// 头像
	avatar?: string
	// 邮箱
	email?: string
	// 手机号
	phone?: string
	// 权限
	permission?: IPermission[] | undefined
	// token
	token?: string
	// 状态
	accountInfo?: IAccountInfo
}
