import React, {useContext} from 'react'
import {GlobalStoreContext} from '../../state'
import {observer} from 'mobx-react-lite'

export const GearPlanner = observer(() => {
	const {classJob} = useContext(GlobalStoreContext)

	return (
		<>
			<h2>gear planner</h2>
			<select>
				{classJob.classJobs.map(cj => (
					<option>{cj.abbreviation}</option>
				))}
			</select>
		</>
	)
})
