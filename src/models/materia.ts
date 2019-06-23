import {MateriaResponse} from 'api/materia'
import {StatAmount} from './stat'
import {StatStore} from 'stores/stat'

export class MateriaModel {
	id: number
	name: string
	stat: StatAmount

	constructor(opts: {id: number; name: string; stat: StatAmount}) {
		this.id = opts.id
		this.name = opts.name
		this.stat = opts.stat
	}

	static fromResponse = (resp: MateriaResponse, opts: {statStore: StatStore}) =>
		new MateriaModel({
			id: resp.ID,
			name: resp.Name,
			stat: {
				stat: opts.statStore.forId(resp.Materia.BaseParam.ID),
				amount: resp.Materia.Value,
			},
		})
}
