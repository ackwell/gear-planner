import React from 'react'
import {classJobStore} from './classJob'
import {gearPlannerStore} from './gearPlanner'
import {statStore} from './stat'
import {materiaStore} from './materia'

const stores = {
	classJobStore,
	gearPlannerStore,
	materiaStore,
	statStore,
}

export const GlobalStoreContext = React.createContext(stores)

export const GlobalStoreProvider: React.ComponentType = ({children}) => (
	<GlobalStoreContext.Provider value={stores}>
		{children}
	</GlobalStoreContext.Provider>
)
