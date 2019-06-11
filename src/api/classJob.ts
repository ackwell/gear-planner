import {xivapi, XivapiListingResponse} from './xivapi'

export interface ClassJobCategory {
	id: number
	name: string
}

export interface ClassJob {
	id: number
	abbr: string
	name: string
	category: ClassJobCategory
}

interface ClassJobResponse {
	ID: number
	Abbreviation: string
	Name: string
	ClassJobCategory: {
		ID: number
		Name: string
	}
}

// TODO: get both of these at the same time somehow?
const columns = [
	'ID',
	'Abbreviation',
	'Name',
	'ClassJobCategory.ID',
	'ClassJobCategory.Name',
].join(',')

const mapClassJob = (resp: ClassJobResponse): ClassJob => ({
	id: resp.ID,
	abbr: resp.Abbreviation,
	name: resp.Name,
	category: {
		id: resp.ClassJobCategory.ID,
		name: resp.ClassJobCategory.Name,
	},
})

export const getClassJobs = (): Promise<ClassJob[]> =>
	xivapi
		.get('classjob', {searchParams: {columns}})
		.json<XivapiListingResponse<ClassJobResponse>>()
		.then(resp => resp.Results.map(mapClassJob))
