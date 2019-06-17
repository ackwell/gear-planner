import React from 'react'
import {GlobalStoreContext} from 'stores/context'
import {observer} from 'mobx-react-lite'
import {ClassJobFilter} from './ClassJobFilter'
import {ClassJobModel} from 'models/classJob'

export const GearPlanner = observer(() => {
	const {gearPlannerStore} = React.useContext(GlobalStoreContext)

	const onSelect = (cj: ClassJobModel) => {
		gearPlannerStore.setClassJob(cj)
	}

	return (
		<>
			<h2>
				gear planner (
				{gearPlannerStore.classJob && gearPlannerStore.classJob.abbreviation})
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
