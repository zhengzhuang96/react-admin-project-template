/*
 * @Author: {zhengzhuang}
 * @Date: 2022-08-16 17:58:57
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2022-11-04 10:06:15
 * @Description:
 */
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import configStore from '@/store'
import Routes from './routes/Routes'

const App: FC = () => {
	const store = configStore()

	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	)
}

export default App
