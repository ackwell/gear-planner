import {xivapi, XivapiListingResponse} from './xivapi'

export interface ClassJob {
	id: number
	abbr: string
	name: string
}

interface ClassJobResponse {
	ID: number
	Abbreviation: string
	Name: string
}

// TODO: get both of these at the same time somehow?
const columns = ['ID', 'Abbreviation', 'Name'].join(',')

const mapClassJob = (classJobResponse: ClassJobResponse): ClassJob => ({
	id: classJobResponse.ID,
	abbr: classJobResponse.Abbreviation,
	name: classJobResponse.Name,
})

export const getClassJobs = async (): Promise<ClassJob[]> =>
	xivapi
		.get('classjob', {searchParams: {columns}})
		.json<XivapiListingResponse<ClassJobResponse>>()
		.then(resp => resp.Results.map(mapClassJob))
