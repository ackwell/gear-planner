import React from 'react'
import {GlobalStoreContext, LoadingState} from '../../state'
import {observer} from 'mobx-react-lite'
import {ClassJob} from '../../api'

export const GearPlanner = () => {
	return (
		<>
			<h2>gear planner</h2>
			<ClassJobFilter onSelect={a => console.log(a)} />
		</>
	)
}

const ClassJobFilter = observer(
	(props: {onSelect?: (classJob: ClassJob) => void}) => {
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
	},
)
