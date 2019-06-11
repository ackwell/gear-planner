import React, {useContext} from 'react'
import {GlobalStoreContext, LoadingState} from '../../state'
import {observer} from 'mobx-react-lite'

export const GearPlanner = () => {
	return (
		<>
			<h2>gear planner</h2>
			<Filter />
		</>
	)
}

const Filter = observer(() => {
	const {classJob} = useContext(GlobalStoreContext)
	classJob.ensure()

	return (
		<>
			{LoadingState[classJob.state]}
			<select>
				{classJob.classJobs.map(cj => (
					<option>{cj.name}</option>
				))}
			</select>
		</>
	)
})
