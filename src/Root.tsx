import React from 'react'
import {App} from './components/App'
import {BrowserRouter as Router} from 'react-router-dom'
import {GlobalStoreProvider} from 'stores'

export const Root = () => (
	<GlobalStoreProvider>
		<Router>
			<App />
		</Router>
	</GlobalStoreProvider>
)
