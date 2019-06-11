import ky from 'ky'

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
