import React from 'react'
import {GlobalStoreContext} from 'stores/context'
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
						{gearPlannerStore.visibleStats.map(stat => (
							<th key={stat.id}>{stat.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{gearPlannerStore.equipment.map(e => (
						<tr key={e.id}>
							<td>{e.name}</td>
							{gearPlannerStore.visibleStats.map(stat => {
								const gearStat = e.stats.find(s => s.id === stat.id)
								const amount = gearStat ? gearStat.amount : '-'
								return <td key={stat.id}>{amount}</td>
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
})
