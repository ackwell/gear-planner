import React from 'react'
import {GlobalStoreContext} from 'stores/context'
import {observer} from 'mobx-react-lite'
import {MateriaModel} from 'models/materia'

interface Props {
	value?: MateriaModel
	onSelect?: (materia?: MateriaModel) => void
}

export const MateriaSelect = observer(({value, onSelect}: Props) => {
	const {materiaStore} = React.useContext(GlobalStoreContext)

	// TODO: memoize w/ a hook or some shit
	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (!onSelect) {
			return
		}

		const {value} = event.target
		if (value === 'none') {
			onSelect(undefined)
			return
		}

		const id = Number(value)
		const mat = materiaStore.materia.find(mat => mat.id === id)
		mat && onSelect(mat)
	}

	return (
		<select value={value ? value.id : 'none'} onChange={onChange}>
			<option value="none">none</option>
			{materiaStore.materia.map(materia => (
				<option key={materia.id} value={materia.id}>
					{materia.name}
				</option>
			))}
		</select>
	)
})
