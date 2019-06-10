import React from 'react'
import {Switch, Route} from 'react-router'
import {GearPlanner} from './GearPlanner'

export const App = () => (
	<>
		<header>
			<h1>biggerdeeps</h1>
		</header>
		<Switch>
			<Route path="/gear-planner" component={GearPlanner} />
		</Switch>
	</>
)
