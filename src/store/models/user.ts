/*
 * @Author: zhengzhuang@yuanduyun.com
 * @Date: 2022-06-02 17:28:50
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-10-24 18:17:45
 * @Description:
 */
import { IUserInfo } from '@/model/common'
import { login } from '@/service/user'
import { cloneDeep } from 'bizcharts/lib/utils'

const initState: IUserInfo = {
	name: 'admin',
	avatar: '',
	token: localStorage.getItem('token') || '',
	roles: [],
	permission: [],
	accountInfo: {
		roles: [], permission: [], token: ''
	},
}

export default {
	state: initState,
	reducers: {
		updateState(state: any, payload: any) {
			return {
				...state,
				...payload,
			}
		},
		resetState() {
			const state = cloneDeep(initState)
			return state
		},
	},
	effects: (dispatch: any) => ({
		updateState(state: any, payload: any) {
			return {
				...state,
				...payload,
			}
		},
		// 用户登录
		async fetchLogin(values: { mobile: string; password: string; key: string }) {
			const data = await login({
				...values,
				mobile: values.mobile + '',
				id: '12221',
			})
			const token = data.token
			$request.setHeader({ Authorization: token, token: token, platform: 'zhd' })
			localStorage.setItem('token', token)
			dispatch.user.updateState({ token })
			window.location.href = '/#/dashboard/index'
		},
		// 设置Token
		setToken(value: string) {
			dispatch.user.updateState({ token: value })
			localStorage.setItem('token', value)
		},
		// 设置用户信息
		setAccountInfo(value: IUserInfo) {
			dispatch.user.updateState({ accountInfo: value })
		},
		/**
	 * 权限检查
	 * @param {Number} id 权限id
	 * @param {boolean} showMsg 无权限时是否显示提示信息
	 */
		checkPermission(id: number, showMsg: boolean = true): any {
			console.log('权限检查', dispatch.user.accountInfo)
			// const existing = this.accountInfo.permission.some(item => item.id === id)
			// if (!existing && showMsg) {
			// 	message.error('没有该权限')
			// }
			// return existing
		},
		// 获取用户信息
		async fetchGetUserInfo() { },
		// 发送短信验证码
		async sendCode(params: { phone: string }) {
			console.log('12312')
			// return $request.post('/auth/wx/sendCode', params);
		},
	}),
}
