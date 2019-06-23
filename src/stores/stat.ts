import {observable, computed} from 'mobx'
import {getStats} from 'api/stat'
import {RequestModel, LoadingState} from 'models/request'
import {StatModel} from 'models/stat'

export class StatStore {
	@observable private request = new RequestModel({query: getStats})

	@computed get stats() {
		return (this.request.response || []).map(StatModel.fromResponse)
	}

	forId(id: StatModel['id']) {
		const stat = this.stats.find(stat => stat.id === id)
		return stat ? stat : new StatModel({id, name: 'Unknown'})
	}

	load() {
		// Only need to load stats once
		if (this.request.state !== LoadingState.WAITING) {
			return
		}

		this.request.execute()
	}
}

export const statStore = new StatStore()
statStore.load()
