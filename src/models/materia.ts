import {createTransformer} from 'mobx-utils'
import {MateriaResponse} from 'api/materia'
import {StatAmount} from './stat'

export class MateriaModel {
	id: number
	name: string
	stat: StatAmount

	constructor(opts: {id: number; name: string; stat: StatAmount}) {
		this.id = opts.id
		this.name = opts.name
		this.stat = opts.stat
	}

	static fromResponse = createTransformer(
		(resp: MateriaResponse) =>
			new MateriaModel({
				id: resp.ID,
				name: resp.Name,
				stat: {id: resp.Materia.BaseParam.ID, amount: resp.Materia.Value},
			}),
	)
}
