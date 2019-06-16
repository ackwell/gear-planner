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

	const theLetterVSixTimes = Array(6).fill('V') as 'V'[]

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
						{theLetterVSixTimes.map((v, index) => (
							<th>{index}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{gearPlannerStore.equipment.map(e => (
						<tr>
							<td>{e.name}</td>
							{theLetterVSixTimes.map((v, index) => {
								const foo = e.stats[index]
								const amount = foo ? foo.amount : 0
								return <td>{amount}</td>
							})}
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
})
