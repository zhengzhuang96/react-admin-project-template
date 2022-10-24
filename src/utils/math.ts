import _ from 'lodash'

/**
 * 生成指定区间的随机整数
 * @param {Number} min 最小数
 * @param {Number} max 最大数
 * @return {Number}
 */
export const randomNumber = (min: number, max: number): number => Math.floor(min + Math.random() * (max - min + 1))

// 判断一个值是否能进行数值运算
export const isNaN = (value: any): boolean => _.isNaN(_.toNumber(value))

/**
 * 数值四舍五入
 * @param {String}} value      值
 * @param {Number}  pointDigit 保留几位小数
 */
export const floatNumber = (value: number | string, decimals: number = 2) => {
	if (_.isNaN(_.toNumber(value))) return value
	const multiple = _.Number('1' + '0'.repeat(decimals))
	return Math.round(_.Number(value) * multiple) / multiple
}

// 获取小数位数
export const getDecimal = (value: number | string): number => {
	const valueStr = _.toString(value)
	if (valueStr.includes('.')) {
		return valueStr.slice(valueStr.indexOf('.') + 1).length
	}
	return 0
}

/**
 * 数值录入
 * @param {String} source     输入的值
 * @param {Boolean} sign      正负数处理。-1只能输入负数；0正负数都可以；1只能输入正数
 * @param {Number}  decimals   保留几位小数。不传参不对小数进行处理，0表示整数。
 */
export const inputNumber = (source: string, sign: -1 | 0 | 1 = 0, decimals?: number): string => {
	let value = source.replace(/^(\-)*\D*(\d*(?:\.\d*)?).*$/g, '$1$2')
	// 正负数处理
	if (sign === 1) {
		value = value.replace(/^\D*(\d*(?:\.\d*)?).*$/g, '$1')
	} else if (sign === -1 && _.toNumber(value) > 0) {
		value = '-' + value
	}
	// 小数处理
	const decimalIndex = value.indexOf('.')
	if (decimals !== undefined && decimalIndex > -1) {
		if (decimals === 0) {
			value = value.slice(0, decimalIndex + decimals)
		} else if (decimals > 0) {
			value = value.slice(0, decimalIndex + decimals + 1)
		}
	}
	return value
}

/**
 * 将数值使用逗号隔开，一般用于金额的输入
 */
export const getCommaNumber = (value: any) => {
	const list = value.toString().split('.')
	const prefix = list[0].charAt(0) === '-' ? '-' : ''
	let num = prefix ? list[0].slice(1) : list[0]
	let result = ''
	while (num.length > 3) {
		result = `,${num.slice(-3)}${result}`
		num = num.slice(0, num.length - 3)
	}
	if (num) {
		result = num + result
	}
	const listSecond = list[1] ? '.' + list[1] : ''
	return `${prefix}${result}${listSecond}`
}
