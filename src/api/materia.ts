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
		query: bodybuilder().filter('exists', 'Materia.BaseParam'),
	})
		.json<XivapiListingResponse<MateriaResponse>>()
		.then(resp => resp.Results)
