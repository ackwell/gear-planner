import {observable, computed} from 'mobx'
import {RequestModel, LoadingState} from 'models/request'
import {getMateria} from 'api/materia'
import {MateriaModel} from 'models/materia'
import {StatStore, statStore} from './stat'

export class MateriaStore {
	private statStore: StatStore
	@observable private request = new RequestModel({query: getMateria})

	@computed get materia() {
		return (this.request.response || []).map(resp =>
			MateriaModel.fromResponse(resp, {statStore: this.statStore}),
		)
	}

	constructor(opts: {statStore: StatStore}) {
		this.statStore = opts.statStore
	}

	load() {
		// Only need to load the materia list once
		// TODO: this is getting repetetive. Look into a better way of doing this shit
		if (this.request.state !== LoadingState.WAITING) {
			return
		}

		this.request.execute()
	}
}

export const materiaStore = new MateriaStore({statStore})
materiaStore.load()
