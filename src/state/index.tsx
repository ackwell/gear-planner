import {configure} from 'mobx'
import React from 'react'
import {ClassJobStore} from './classJob'

configure({
	enforceActions: 'observed',
})

const stores = {
	classJob: new ClassJobStore(),
}

export const GlobalStoreContext = React.createContext(stores)

export const GlobalStoreProvider: React.FC = ({children}) => (
	<GlobalStoreContext.Provider value={stores}>
		{children}
	</GlobalStoreContext.Provider>
)
