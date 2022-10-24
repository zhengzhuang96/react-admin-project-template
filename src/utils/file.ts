/**
 * 文件处理
 */

// 文件大小
enum FileSizes {
	'K' = 1024,
	'M' = 1048576,
	'G' = 1073741824,
	'T' = 1099511627776
}

// 计算文件大小
export const calcFileSize = (fileByte: number): string => {
	const KB = FileSizes.K
	const MB = FileSizes.M
	const GB = FileSizes.G
	const TB = FileSizes.T
	const FIXED_TWO_POINT = 2
	let fileSizeMsg = ''
	if (fileByte < KB) {
		fileSizeMsg = '文件小于1K'
	} else if (fileByte > KB && fileByte < MB) {
		fileSizeMsg = (fileByte / KB).toFixed(FIXED_TWO_POINT) + 'K'
	} else if (fileByte === MB) {
		fileSizeMsg = '1M'
	} else if (fileByte > MB && fileByte < GB) {
		fileSizeMsg = (fileByte / (KB * KB)).toFixed(FIXED_TWO_POINT) + 'M'
	} else if (fileByte > MB && fileByte === GB) {
		fileSizeMsg = '1G'
	} else if (fileByte > GB && fileByte < TB) {
		fileSizeMsg = (fileByte / (KB * KB * KB)).toFixed(FIXED_TWO_POINT) + 'G'
	} else {
		fileSizeMsg = '文件超过1T'
	}
	return fileSizeMsg
}

// 获取文件后缀
export const getFileSuffix = (fileName: string): string => {
	const pointIndex: number = fileName.lastIndexOf('.')
	let suffix: string
	if (pointIndex > -1) {
		suffix = fileName.slice(pointIndex + 1)
	} else {
		suffix = 'file'
	}
	return suffix
}

// 下载文件(base64)
export const downloadByURI = (data: string, fileName: string, header: string = '') => {
	const link = document.createElement('a')
	link.style.display = 'none'
	link.href = header + data
	link.download = fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

// 下载文件(blob)
export const downloadByBlob = (binaryString, fileName: string) => {
	const blob = new Blob([binaryString], { type: 'application/octet-stream' })
	const link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName
	link.click()
	//延时释放
	setTimeout(() => {
		window.URL.revokeObjectURL(link.href)
	}, 100)
}
