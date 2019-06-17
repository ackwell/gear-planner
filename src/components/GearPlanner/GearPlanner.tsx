import React from 'react'
import {GlobalStoreContext} from 'stores/context'
import {observer} from 'mobx-react-lite'
import {ClassJobFilter} from './ClassJobFilter'
import {ClassJobModel} from 'models/classJob'
import {EquipmentModel} from 'models/equipment'

export const GearPlanner = observer(() => {
	const {gearPlannerStore} = React.useContext(GlobalStoreContext)

	const onSelectClassJob = (cj: ClassJobModel) => {
		gearPlannerStore.setClassJob(cj)
	}

	const onClickEquipment = (e: EquipmentModel) => {
		gearPlannerStore.selectEqipment(e)
	}

	return (
		<>
			<h2>
				gear planner (
				{gearPlannerStore.classJob && gearPlannerStore.classJob.abbreviation})
			</h2>
			<ClassJobFilter onSelect={onSelectClassJob} />
			<hr />
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Materia</th>
						{gearPlannerStore.visibleStats.map(stat => (
							<th key={stat.id}>{stat.name}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* TODO: make this a component lel */}
					{gearPlannerStore.equipment.map(e => {
						const onClick = () => onClickEquipment(e)
						const shittyMateriaArray = [...Array(e.materiaSlots).keys()]
						return (
							<tr key={e.id} onClick={onClick}>
								<td>{e.name}</td>
								<td>
									{shittyMateriaArray.map(() => (
										<>[ ]</>
									))}
								</td>
								{gearPlannerStore.visibleStats.map(stat => {
									const gearStat = e.stats.find(s => s.id === stat.id)
									const amount = gearStat ? gearStat.amount : '-'
									return <td key={stat.id}>{amount}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<hr />
			{gearPlannerStore.selectedEquipment
				? gearPlannerStore.selectedEquipment.name
				: 'nothing chosen'}
		</>
	)
})
