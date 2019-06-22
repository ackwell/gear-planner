import {ItemLevelResponse} from 'api/itemLevel'

/** Maps stats defined directly on the Item interface to their BaseParam ID */
export const intrinsicStatMap = {
	DamagePhys: 12,
	DamageMag: 13,
	BlockRate: 17,
	Block: 18,
	DefensePhys: 21,
	DefenseMag: 24,
}

/** Maps item level columns to their BaseParam ID */
type MapKey = Exclude<keyof ItemLevelResponse, 'ID'>
export const itemLevelStatMap: Record<MapKey, number> = {
	Strength: 1,
	Dexterity: 2,
	Vitality: 3,
	Intelligence: 4,
	Mind: 5,
	Piety: 6,
	GP: 10,
	CP: 11,
	Tenacity: 19,
	DirectHitRate: 22,
	CriticalHit: 27,
	Determination: 44,
	SkillSpeed: 45,
	SpellSpeed: 46,
	Craftsmanship: 70,
	Control: 71,
	Gathering: 72,
	Perception: 73,
}
