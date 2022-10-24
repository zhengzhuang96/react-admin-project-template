import { tupleStr } from '@/utils/core'

// 项目中所有存储在localStorage中的数据的名称
const localKeyName = tupleStr(
	// 还款方式。 free:自由还，day：按天还，month：按月还
	'repay_type',
	// 当前用户信息
	'account_info',
	// 是否展示会员详情。true：显示，false：隐藏
	'customer_detail_visible'
)

// 项目中所有存储在sessionStorage中的数据的名称
const sessionKeyName = tupleStr()

type localKeyName = typeof localKeyName[number]
type sessionKeyName = typeof sessionKeyName[number]
type keyName = localKeyName | sessionKeyName

class StorageMng {
	// key名称前缀
	private prefix: string
	// 使用localStorage还是sessionStorage
	private mode: Storage

	constructor(mode: Storage, prefix: string = '') {
		this.prefix = prefix
		this.mode = mode
	}

	public setItem(keyName: keyName, value: any) {
		try {
			this.mode.setItem(`${this.prefix}${keyName}`, JSON.stringify(value))
		} catch (err) {
			console.warn(`Storage ${keyName} set error`, err)
		}
	}

	public getItem(keyName: keyName) {
		const result = this.mode.getItem(`${this.prefix}${keyName}`)
		try {
			return result ? JSON.parse(result) : result
		} catch (err) {
			console.warn(`Storage ${keyName} get error`, err)
			// 如果 parse 错误，代表这个存储错误，认为就是没有这个存储，保持和没存储的表现一致，返回 null
			return null
		}
	}

	public removeItem(keyName: keyName) {
		this.mode.removeItem(`${this.prefix}${keyName}`)
	}

	public clear() {
		this.mode.clear()
	}

	public getKey(index: number) {
		return this.getKeys()[index]
	}

	// 获取所有数据的名称
	public getKeys() {
		const keys: keyName[] = []
		Array.from({ length: this.mode.length }).forEach((item, index) => {
			const keyName = this.mode.key(index)
			if (keyName?.startsWith(this.prefix)) {
				keys.push(keyName.slice(this.prefix.length) as keyName)
			}
		})
		return keys
	}

	// 获取所有数据
	public getAll() {
		return Object.fromEntries(this.getKeys().map(keyName => [keyName, this.getItem(keyName)]))
	}
}

const localMng = new StorageMng(localStorage)
const sessionMng = new StorageMng(sessionStorage)

export { StorageMng, localMng, sessionMng }
