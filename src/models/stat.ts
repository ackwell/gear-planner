import {StatResponse} from 'api/stat'

export class StatModel {
	id: number
	name: string
	order?: number

	constructor(opts: {id: number; name: string; order?: number}) {
		this.id = opts.id
		this.name = opts.name
		this.order = opts.order
	}

	static fromResponse = (resp: StatResponse) =>
		new StatModel({
			id: resp.ID,
			name: resp.Name,
			// -1 represents "don't show", so I'm opting to unset the field for a more js-esque repr
			order: resp.Order === '-1' ? undefined : resp.Order,
		})
}
