import {xivapi, XivapiListingResponse} from './xivapi'

export interface ClassJobResponse {
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

export const getClassJobs = () =>
	xivapi
		.get('classjob', {searchParams: {columns}})
		.json<XivapiListingResponse<ClassJobResponse>>()
		.then(resp => resp.Results)
