import {GlobalStoreContext} from '../../state'
import React from 'react'
import {observer} from 'mobx-react-lite'
import {ClassJob} from '../../api'
import {LoadingState} from '../../state/request'

interface Props {
	onSelect?: (classJob: ClassJob) => void
}

export const ClassJobFilter = observer((props: Props) => {
	const {classJobStore} = React.useContext(GlobalStoreContext)
	classJobStore.load()

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
			{LoadingState[classJobStore.request.state]}
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
