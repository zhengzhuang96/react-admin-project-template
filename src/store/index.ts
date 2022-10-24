/*
 * @Author: zhengzhuang@yuanduyun.com
 * @Date: 2022-05-26 16:42:28
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-07-22 17:40:27
 * @Description: 数据状态管理
 */
import { init, RematchRootState } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import models from './loader'

const loadingPlugin = createLoadingPlugin({ type: 'number' })
const store = init({
	plugins: [loadingPlugin],
	models,
})

export type IStore = typeof store
export type IDispatch = typeof store.dispatch
export type IRootState = RematchRootState<typeof models>

const configureStore = () => {
	return store
}
$request.setHeader({
	Authorization: sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token'),
	platform: 'zhd',
})

export default configureStore
