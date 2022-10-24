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
