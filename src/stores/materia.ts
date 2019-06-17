import {observable, computed} from 'mobx'
import {RequestModel, LoadingState} from 'models/request'
import {getMateria} from 'api/materia'
import {MateriaModel} from 'models/materia'

export class MateriaStore {
	@observable private request = new RequestModel({query: getMateria})

	@computed get materia() {
		return (this.request.response || []).map(MateriaModel.fromResponse)
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

export const materiaStore = new MateriaStore()
materiaStore.load()
