import React from 'react'
import {GlobalStoreContext} from 'state/stores'
import {observer} from 'mobx-react-lite'
import {ClassJob} from 'api/classJob'
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
			<hr />
			<table>
				<thead>
					<tr>
						<th>Name</th>
						{gearPlannerStore.visibleStats.map(statId => (
							<th key={statId}>{statId}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{gearPlannerStore.equipment.map(e => (
						<tr>
							<td>{e.name}</td>
							{gearPlannerStore.visibleStats.map(statId => {
								const stat = e.stats.find(s => s.id === statId)
								const amount = stat ? stat.amount : '-'
								return <td key={statId}>{amount}</td>
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
})
