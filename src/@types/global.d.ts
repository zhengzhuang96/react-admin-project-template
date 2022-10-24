/*
 * @Author: {zhengzhuang}
 * @Date: 2022-07-20 14:54:01
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-08-12 17:48:58
 * @Description:
 */
import { MessageApi } from 'antd/lib/message'
import { Request } from '@/utils/request'

declare global {
	export const $message: MessageApi
	export const $request: Request
	export const VERSION = '1.0.0'
}
