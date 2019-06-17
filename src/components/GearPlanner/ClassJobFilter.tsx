import {GlobalStoreContext} from 'stores/context'
import React from 'react'
import {observer} from 'mobx-react-lite'
import {ClassJobModel} from 'models/classJob'

interface Props {
	onSelect?: (classJob: ClassJobModel) => void
}

export const ClassJobFilter = observer((props: Props) => {
	const {classJobStore} = React.useContext(GlobalStoreContext)

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
	)
})
