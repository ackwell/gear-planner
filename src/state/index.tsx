import {configure} from 'mobx'
import React from 'react'
import {classJobStore} from './classJob'

configure({
	enforceActions: 'observed',
})

const stores = {
	classJobStore,
}

export const GlobalStoreContext = React.createContext(stores)

export const GlobalStoreProvider: React.FC = ({children}) => (
	<GlobalStoreContext.Provider value={stores}>
		{children}
	</GlobalStoreContext.Provider>
)

// Re-exports
export * from './classJob'
