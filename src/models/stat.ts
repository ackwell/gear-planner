import {StatResponse} from 'api/stat'
import {createTransformer} from 'mobx-utils'
import {baseParamSlotMap} from 'data/stat'

export interface StatAmount {
	stat: StatModel
	amount: number
}

interface SlotCap {
	slot: number
	percent: number
}

export class StatModel {
	id: number
	name: string
	order?: number
	slotCaps: SlotCap[]

	constructor(opts: {
		id: number
		name: string
		order?: number
		slotCaps: SlotCap[]
	}) {
		this.id = opts.id
		this.name = opts.name
		this.order = opts.order
		this.slotCaps = opts.slotCaps
	}

	static fromResponse = createTransformer(
		(resp: StatResponse) =>
			new StatModel({
				id: resp.ID,
				name: resp.Name,
				// -1 represents "don't show", so I'm opting to unset the field for a more js-esque repr
				order: resp.Order === '-1' ? undefined : resp.Order,
				slotCaps: Object.entries(baseParamSlotMap).map(([key, slot]) => ({
					slot,
					percent: resp[key as keyof typeof baseParamSlotMap],
				})),
			}),
	)
}
