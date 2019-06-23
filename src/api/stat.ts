import {xivapi, XivapiListingResponse} from './xivapi'

export interface StatResponse {
	ID: number
	Name: string
	Order: number | '-1'

	'1HWpn%': number
	'OH%': number
	'Head%': number
	'Chest%': number
	'Hands%': number
	'Waist%': number
	'Legs%': number
	'Feet%': number
	'Earring%': number
	'Necklace%': number
	'Bracelet%': number
	'Ring%': number
	'2HWpn%': number
	'ChestHead%': number
	'LegsFeet%': number
	'HeadChestHandsLegsFeet%': number
	'ChestLegsGloves%': number
	'ChestLegsFeet%': number
}

const columns = [
	'ID',
	'Name',
	'Order',

	'1HWpn%',
	'OH%',
	'Head%',
	'Chest%',
	'Hands%',
	'Waist%',
	'Legs%',
	'Feet%',
	'Earring%',
	'Necklace%',
	'Bracelet%',
	'Ring%',
	'2HWpn%',
	'ChestHead%',
	'LegsFeet%',
	'HeadChestHandsLegsFeet%',
	'ChestLegsGloves%',
	'ChestLegsFeet%',
].join(',')

export const getStats = () =>
	xivapi
		.get('baseparam', {searchParams: {columns}})
		.json<XivapiListingResponse<StatResponse>>()
		.then(resp => resp.Results)
