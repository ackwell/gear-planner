import {xivapi, XivapiListingResponse} from './xivapi'
import {ClassJob} from './classJob'

export interface Equipment {
	id: number
	name: string
}

interface ItemResponse {
	ID: number
	Name: string
}

const mapEquipment = (resp: ItemResponse): Equipment => ({
	id: resp.ID,
	name: resp.Name,
})

// TODO: Write a generalised search handler
export const findEquipment = (opts: {
	classJob: ClassJob
}): Promise<Equipment[]> =>
	xivapi
		.post('search', {
			json: {
				indexes: 'item',
				columns: 'ID,Name',
				body: {
					query: {
						bool: {
							// Relying on <<magic>> for that CJC filter
							filter: [{term: {[`ClassJobCategory.${opts.classJob.abbr}`]: 1}}],
						},
					},
					sort: [{LevelItem: 'desc'}],
				},
			},
		})
		.json<XivapiListingResponse<ItemResponse>>()
		.then(resp => resp.Results.map(mapEquipment))
