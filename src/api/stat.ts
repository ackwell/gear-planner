import {xivapi, XivapiListingResponse} from './xivapi'

export interface StatResponse {
	ID: number
	Name: string
	Order: number | '-1'
}

const columns = ['ID', 'Name', 'Order'].join(',')

export const getStats = () =>
	xivapi
		.get('baseparam', {searchParams: {columns}})
		.json<XivapiListingResponse<StatResponse>>()
		.then(resp => resp.Results)
