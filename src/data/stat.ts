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

type MapKey = Exclude<keyof ItemLevelResponse, 'ID'>
/** Maps item level columns to their BaseParam ID */
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

/** Maps BaseParam slots to their EquipSlotCategory ID */
export enum BaseParamSlotMap {
	'1HWpn%' = 1,
	'OH%' = 2,
	'Head%' = 3,
	'Chest%' = 4,
	'Hands%' = 5,
	'Waist%' = 6,
	'Legs%' = 7,
	'Feet%' = 8,
	'Earring%' = 9,
	'Necklace%' = 10,
	'Bracelet%' = 11,
	'Ring%' = 12,
	'2HWpn%' = 13,
	// MH -or- OH
	'ChestHead%' = 15,
	// Body, Feet, Gloves, Legs
	// Soul Crystal
	'LegsFeet%' = 18,
	'HeadChestHandsLegsFeet%' = 19,
	'ChestLegsGloves%' = 20,
	'ChestLegsFeet%' = 21,
	// Unequippable

	// 'ChestHeadLegsFeet%', ??
}
