import {ClassJobResponse} from 'api/classJob'
import {createTransformer} from 'mobx-utils'

export interface ClassJobCategory {
	id: number
	name: string
}

export class ClassJobModel {
	id: number
	abbreviation: string
	name: string
	category: ClassJobCategory

	constructor(opts: {
		id: number
		abbreviation: string
		name: string
		category: ClassJobCategory
	}) {
		this.id = opts.id
		this.abbreviation = opts.abbreviation
		this.name = opts.name
		this.category = opts.category
	}

	static fromResponse = createTransformer(
		(resp: ClassJobResponse) =>
			new ClassJobModel({
				id: resp.ID,
				abbreviation: resp.Abbreviation,
				name: resp.Name,
				category: {
					id: resp.ClassJobCategory.ID,
					name: resp.ClassJobCategory.Name,
				},
			}),
	)
}
