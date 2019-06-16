import ky from 'ky'
import {Bodybuilder} from 'bodybuilder'

export interface XivapiPagination {
	Page: number
	PageNext: number
	PagePrev: number
	PageTotal: number
	Results: number
	ResultsPerPage: number
	ResultsTotal: number
}

export interface XivapiListingResponse<T extends object> {
	Pagination: XivapiPagination
	Results: T[]
}

export const xivapi = ky.create({
	prefixUrl: 'https://xivapi.com/',
})

export const xivapiSearch = (opts: {
	indexes: string[]
	columns: string[]
	query: Bodybuilder
}) =>
	xivapi.post('search', {
		json: {
			indexes: opts.indexes.join(','),
			columns: opts.columns.join(','),
			body: opts.query.build(),
		},
	})
