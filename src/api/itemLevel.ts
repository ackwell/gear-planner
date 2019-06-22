import {xivapi, XivapiListingResponse} from './xivapi'
import {Options} from 'ky'

// There's obviously a lot more fields available - this data is primarily used to
// calculate stat caps - so I'm only requesting fields that can be melded in some
// manner.
export interface ItemLevelResponse {
	ID: number
	CP: number
	Control: number
	Craftsmanship: number
	CriticalHit: number
	Determination: number
	Dexterity: number
	DirectHitRate: number
	GP: number
	Gathering: number
	Intelligence: number
	Mind: number
	Perception: number
	Piety: number
	SkillSpeed: number
	SpellSpeed: number
	Strength: number
	Tenacity: number
	Vitality: number
}

const columns = [
	'ID',
	'CP',
	'Control',
	'Craftsmanship',
	'CriticalHit',
	'Determination',
	'Dexterity',
	'DirectHitRate',
	'GP',
	'Gathering',
	'Intelligence',
	'Mind',
	'Perception',
	'Piety',
	'SkillSpeed',
	'SpellSpeed',
	'Strength',
	'Tenacity',
	'Vitality',
].join(',')

export const getItemLevels = (opts: {ids?: number[]}) => {
	const searchParams: Options['searchParams'] = {columns}
	if (opts.ids) {
		searchParams.ids = opts.ids.join(',')
	}

	return xivapi
		.get('itemlevel', {searchParams})
		.json<XivapiListingResponse<ItemLevelResponse>>()
		.then(resp => resp.Results)
}
