/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-22 18:03:09
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:49:27
 * @Description:
 */
import { cloneDeep } from 'bizcharts/lib/utils'

interface ICustomer { }

const initState: ICustomer = {}

export default {
	nameSpace: 'customer',
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
		demo() {
			dispatch.customer.updateState()
		},
	}),
}
