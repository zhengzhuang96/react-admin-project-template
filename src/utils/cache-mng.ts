import { tupleStr } from '@/utils/core'

const cacheNames = tupleStr(
	// 货品列表
	'goods_list',
	// 用户列表
	'use_list'
)

type CacheName = typeof cacheNames[number]

interface ICache {
	data: any
	timer?: number
	startTime: number
}

class CacheMng {
	caches = new Map<CacheName, ICache>()

	setItem(key: CacheName, data: any, cacheTime: number = 0) {
		const currentCache = this.caches.get(key)
		if (currentCache?.timer) {
			clearTimeout(currentCache.timer)
		}
		let timer
		if (cacheTime > -1) {
			timer = setTimeout(() => {
				this.caches.delete(key)
			}, cacheTime)
		}
		this.caches.set(key, {
			data,
			timer,
			startTime: new Date().getTime()
		})
	}

	getItem(key: CacheName) {
		const currentCache = this.caches.get(key)
		if (currentCache?.data) {
			return currentCache.data
		}
	}

	removeItem = (key: CacheName) => {
		const currentCache = this.caches.get(key)
		if (currentCache) {
			clearTimeout(currentCache.timer)
			this.caches.delete(key)
		}
	}
}

const cacheMng = new CacheMng()

export default cacheMng
