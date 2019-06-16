import {xivapi, XivapiListingResponse} from './xivapi'

export interface Stat {
	id: number
	name: string
	order?: number
}

interface BaseParamResponse {
	ID: number
	Name: string
	Order: number | '-1'
}

const columns = ['ID', 'Name', 'Order'].join(',')

const mapStat = (resp: BaseParamResponse): Stat => ({
	id: resp.ID,
	name: resp.Name,
	// -1 represents "don't show", so I'm opting to unset the field for a more js-esque repr
	order: resp.Order === '-1' ? undefined : resp.Order,
})

export const getStats = (): Promise<Stat[]> =>
	xivapi
		.get('baseparam', {searchParams: {columns}})
		.json<XivapiListingResponse<BaseParamResponse>>()
		.then(resp => resp.Results.map(mapStat))
