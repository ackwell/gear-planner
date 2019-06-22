import {StatAmount} from './stat'
import {createTransformer} from 'mobx-utils'
import {ItemLevelResponse} from 'api/itemLevel'
import {itemLevelStatMap} from 'data/stat'

export class ItemLevelModel {
	id: number
	stats: StatAmount[]

	constructor(opts: {id: number; stats: StatAmount[]}) {
		this.id = opts.id
		this.stats = opts.stats
	}

	static fromResponse = createTransformer(
		(resp: ItemLevelResponse) =>
			new ItemLevelModel({
				id: resp.ID,
				stats: Object.entries(itemLevelStatMap).map(([key, id]) => ({
					id,
					amount: resp[key as keyof ItemLevelResponse],
				})),
			}),
	)
}
