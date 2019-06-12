import React from 'react'
import {GlobalStoreContext} from '../../state'
import {observer} from 'mobx-react-lite'
import {ClassJob} from '../../api'
import {ClassJobFilter} from './ClassJobFilter'

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
