import bodybuilder from 'bodybuilder'
import {XivapiListingResponse, xivapiSearch} from './xivapi'

export interface EquipmentResponse {
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
]

export const findEquipment = (opts: {abbreviation: string}) =>
	xivapiSearch({
		indexes: ['item'],
		columns,
		query: bodybuilder()
			.query('term', `ClassJobCategory.${opts.abbreviation}`, 1)
			.sort('LevelItem', 'desc'),
	})
		.json<XivapiListingResponse<EquipmentResponse>>()
		.then(resp => resp.Results)
