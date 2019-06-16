import bodybuilder from 'bodybuilder'
import {XivapiListingResponse, xivapiSearch} from './xivapi'
import {ClassJob} from './classJob'

// TODO: This should probably be re-visited and put somewhere else
interface StatAmount {
	id: number
	amount: number
}

export interface Equipment {
	id: number
	name: string
	itemLevel: number
	stats: StatAmount[]
	statHqModifiers: StatAmount[]
}

interface ItemResponse {
	ID: number
	Name: string
	LevelItem: number
	BaseParam0TargetID: number
	BaseParam1TargetID: number
	BaseParam2TargetID: number
	BaseParam3TargetID: number
	BaseParam4TargetID: number
	BaseParam5TargetID: number
	BaseParamValue0: number
	BaseParamValue1: number
	BaseParamValue2: number
	BaseParamValue3: number
	BaseParamValue4: number
	BaseParamValue5: number
	BaseParamSpecial0TargetID: number
	BaseParamSpecial1TargetID: number
	BaseParamSpecial2TargetID: number
	BaseParamSpecial3TargetID: number
	BaseParamSpecial4TargetID: number
	BaseParamSpecial5TargetID: number
	BaseParamValueSpecial0: number
	BaseParamValueSpecial1: number
	BaseParamValueSpecial2: number
	BaseParamValueSpecial3: number
	BaseParamValueSpecial4: number
	BaseParamValueSpecial5: number
}

const columns = [
	'ID',
	'Name',
	'LevelItem',

	// SAVE ME
	'BaseParam0TargetID',
	'BaseParam1TargetID',
	'BaseParam2TargetID',
	'BaseParam3TargetID',
	'BaseParam4TargetID',
	'BaseParam5TargetID',
	'BaseParamValue0',
	'BaseParamValue1',
	'BaseParamValue2',
	'BaseParamValue3',
	'BaseParamValue4',
	'BaseParamValue5',
	'BaseParamSpecial0TargetID',
	'BaseParamSpecial1TargetID',
	'BaseParamSpecial2TargetID',
	'BaseParamSpecial3TargetID',
	'BaseParamSpecial4TargetID',
	'BaseParamSpecial5TargetID',
	'BaseParamValueSpecial0',
	'BaseParamValueSpecial1',
	'BaseParamValueSpecial2',
	'BaseParamValueSpecial3',
	'BaseParamValueSpecial4',
	'BaseParamValueSpecial5',
] //.join(',')

const mapEquipment = (resp: ItemResponse): Equipment => ({
	id: resp.ID,
	name: resp.Name,
	itemLevel: resp.LevelItem,
	stats: [
		{id: resp.BaseParam0TargetID, amount: resp.BaseParamValue0},
		{id: resp.BaseParam1TargetID, amount: resp.BaseParamValue1},
		{id: resp.BaseParam2TargetID, amount: resp.BaseParamValue2},
		{id: resp.BaseParam3TargetID, amount: resp.BaseParamValue3},
		{id: resp.BaseParam4TargetID, amount: resp.BaseParamValue3},
		{id: resp.BaseParam5TargetID, amount: resp.BaseParamValue5},
	].filter(stat => stat.id !== 0),
	statHqModifiers: [
		{id: resp.BaseParamSpecial0TargetID, amount: resp.BaseParamValueSpecial0},
		{id: resp.BaseParamSpecial1TargetID, amount: resp.BaseParamValueSpecial1},
		{id: resp.BaseParamSpecial2TargetID, amount: resp.BaseParamValueSpecial2},
		{id: resp.BaseParamSpecial3TargetID, amount: resp.BaseParamValueSpecial3},
		{id: resp.BaseParamSpecial4TargetID, amount: resp.BaseParamValueSpecial3},
		{id: resp.BaseParamSpecial5TargetID, amount: resp.BaseParamValueSpecial5},
	].filter(stat => stat.id !== 0),
})

export const findEquipment = (opts: {
	classJob: ClassJob
}): Promise<Equipment[]> =>
	xivapiSearch({
		indexes: ['item'],
		columns,
		query: bodybuilder()
			.query('term', `ClassJobCategory.${opts.classJob.abbr}`, 1)
			.sort('LevelItem', 'desc'),
	})
		.json<XivapiListingResponse<ItemResponse>>()
		.then(resp => resp.Results.map(mapEquipment))
