import {StatAmount} from './stat'
import {ItemLevelResponse} from 'api/itemLevel'
import {itemLevelStatMap} from 'data/stat'
import {StatStore} from 'stores/stat'

export class ItemLevelModel {
	id: number
	stats: StatAmount[]

	constructor(opts: {id: number; stats: StatAmount[]}) {
		this.id = opts.id
		this.stats = opts.stats
	}

	static fromResponse = (
		resp: ItemLevelResponse,
		opts: {statStore: StatStore},
	) =>
		new ItemLevelModel({
			id: resp.ID,
			stats: Object.entries(itemLevelStatMap).map(([key, id]) => ({
				stat: opts.statStore.forId(id),
				amount: resp[key as keyof typeof itemLevelStatMap],
			})),
		})
}
