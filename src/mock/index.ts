import Mock from 'mockjs'

import account from './modules/account'
import baseTable from './modules/baseTable'
import user from './modules/user'

// 延时数据返回,模拟loading效果
Mock.setup({
	timeout: '300-800'
})

Mock.mock(/login/, 'post', account.login)
Mock.mock(/accountInfo/, 'get', account.getAccountInfo)

Mock.mock(/\/baseTable/, 'get', baseTable.getBaseTable)

Mock.mock(/\/user\/list/, 'post', user.getList)
Mock.mock(/\/user\/detail/, 'post', user.getDetail)
Mock.mock(/\/user\/update/, 'post', user.update)
Mock.mock(/\/user\/delete/, 'post', user.remove)
