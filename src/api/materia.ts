import bodybuilder from 'bodybuilder'
import {xivapiSearch, XivapiListingResponse} from './xivapi'

export interface MateriaResponse {
	ID: number
	Name: string
	Materia: {
		BaseParam: {ID: number}
		Value: number
	}
	// TODO: might be able to hook into `GameContentLinks.Materia.Item<X>`
	// to derive the 'tier' of the materia (X + 1)
}

const columns = ['ID', 'Name', 'Materia.BaseParam.ID', 'Materia.Value']

export const getMateria = () =>
	xivapiSearch({
		indexes: ['item'],
		columns,
		query: bodybuilder()
			// Relying on xivapi's link to materia. Materia will have a valid BaseParam here.
			.filter('exists', 'Materia.BaseParam')
			// Old materia aren't removed, they just set the value to 0 - get rid of them
			.filter('range', 'Materia.Value', {gt: 0})
			// We want all the matching materia in one go, gimme gimme
			.size(1000),
	})
		.json<XivapiListingResponse<MateriaResponse>>()
		.then(resp => resp.Results)
