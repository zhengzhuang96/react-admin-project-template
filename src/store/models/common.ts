/*
 * @Author: zhengzhuang@yuanduyun.com
 * @Date: 2022-05-26 16:44:42
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:48:38
 * @Description:
 */
import { getBasicDictList } from '@/service'
import { cloneDeep } from 'bizcharts/lib/utils'

interface ICommon {
	basicDictList: any[]
}

const initState: ICommon = {
	basicDictList: [], // 船公司列表
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
		// 字典查询&获取船司列表
		async fetchBasicDictList() {
			const result = await getBasicDictList()
			dispatch.common.updateState({
				basicDictList: result,
			})
		},
	}),
}
