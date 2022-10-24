import { RouteProps } from 'react-router-dom'
import { IconName } from '@/assets/icons'

// 主要是继承RouteProps的path，component来使用
export default interface IRoute extends RouteProps {
	key: string
	type: 'menu' | 'subMenu' | 'item'
	props: any
	// name供权限管理使用
	name: string
	// title供菜单使用
	label: string
	path: string
	// icon供菜单使用
	icon?: IconName | string
	// 是否在侧边菜单显示
	hiddenInMenu?: boolean
	children?: IRoute[]
}
