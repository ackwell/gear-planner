import React from 'react'
import {GlobalStoreContext, LoadingState} from '../../state'
import {observer} from 'mobx-react-lite'
import {ClassJob} from '../../api'

export const GearPlanner = observer(() => {
	const {gearPlannerStore} = React.useContext(GlobalStoreContext)

	const onSelect = (cj: ClassJob) => {
		gearPlannerStore.setClassJob(cj)
	}

	return (
		<>
			<h2>
				gear planner ({gearPlannerStore.classJob && gearPlannerStore.classJob.abbr})
			</h2>
			<ClassJobFilter onSelect={onSelect} />
		</>
	)
})

interface ClassJobFilterProps {
	onSelect?: (classJob: ClassJob) => void
}

const ClassJobFilter = observer((props: ClassJobFilterProps) => {
	const {classJobStore} = React.useContext(GlobalStoreContext)
	classJobStore.ensure()

	const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {onSelect} = props
		if (!onSelect) {
			return
		}
		const id = Number(event.target.value)
		const cj = classJobStore.classJobs.find(cj => cj.id === id)
		cj && onSelect(cj)
	}

	// TODO: break this up a bit?
	return (
		<>
			{LoadingState[classJobStore.state]}
			<select onChange={onSelect}>
				{classJobStore.categories.map(cat => (
					<optgroup key={cat.id} label={cat.name}>
						{classJobStore.classJobs
							.filter(cj => cj.category.id === cat.id)
							.map(cj => (
								<option key={cj.id} value={cj.id}>
									{cj.name}
								</option>
							))}
					</optgroup>
				))}
			</select>
		</>
	)
})
