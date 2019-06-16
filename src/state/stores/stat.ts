import {observable, computed} from 'mobx'
import {getStats} from 'api/stat'
import {RequestModel, LoadingState} from 'state/models/request'

export class StatStore {
	@observable request = new RequestModel({query: getStats})

	@computed get stats() {
		return this.request.response || []
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
