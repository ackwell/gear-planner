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
				{classJob.categories.map(cat => (
					<optgroup label={cat.name}>
						{classJob.classJobs
							.filter(cj => cj.category.id === cat.id)
							.map(cj => (
								<option value={cj.id}>{cj.name}</option>
							))}
					</optgroup>
				))}
			</select>
		</>
	)
})
