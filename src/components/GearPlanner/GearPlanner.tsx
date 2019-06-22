import React from 'react'
import {GlobalStoreContext} from 'stores/context'
import {observer} from 'mobx-react-lite'
import {ClassJobFilter} from './ClassJobFilter'
import {ClassJobModel} from 'models/classJob'
import {EquipmentModel} from 'models/equipment'
import {MateriaSelect} from './MateriaSelect'
import {MateriaModel} from 'models/materia'

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
								<td>
									{e.name} [{e.baseParamSlot}]
								</td>
								<td>
									{shittyMateriaArray.map(i => (
										<React.Fragment key={i}>[{e.materia[i] ? 'x' : ' '}]</React.Fragment>
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
			{gearPlannerStore.selectedEquipment ? (
				<GearEditor equipment={gearPlannerStore.selectedEquipment} />
			) : (
				'nothing chosen'
			)}
		</>
	)
})

// TODO: seperate file and shit
const GearEditor = observer(({equipment: e}: {equipment: EquipmentModel}) => {
	// TODO: use lodash or some shit
	const shittyMateriaArray = [...Array(e.materiaSlots).keys()]
	return (
		<>
			{e.name}
			{shittyMateriaArray.map(i => {
				const onSelect = (materia?: MateriaModel) => {
					e.setMateria(i, materia)
				}
				return (
					<div key={i}>
						<MateriaSelect value={e.materia[i]} onSelect={onSelect} />
					</div>
				)
			})}
		</>
	)
})
