import React from 'react'
import {classJobStore} from './classJob'
import {gearPlannerStore} from './gearPlanner'
import {statStore} from './stat'

const stores = {
	classJobStore,
	gearPlannerStore,
	statStore,
}

export const GlobalStoreContext = React.createContext(stores)

export const GlobalStoreProvider: React.FC = ({children}) => (
	<GlobalStoreContext.Provider value={stores}>
		{children}
	</GlobalStoreContext.Provider>
)
