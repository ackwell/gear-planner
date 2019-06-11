import {observable, flow} from 'mobx'
import {ClassJob, getClassJobs} from '../api'

export enum LoadingState {
	WAITING,
	LOADING,
	COMPLETE,
}

export class ClassJobStore {
	@observable.ref state: LoadingState = LoadingState.WAITING
	@observable.ref classJobs: ClassJob[] = []

	// @action
	ensure = flow(function*(this: ClassJobStore) {
		// Only need to load classjobs once
		if (this.state !== LoadingState.WAITING) {
			return
		}

		this.state = LoadingState.LOADING

		try {
			const classJobs = yield getClassJobs()
			this.state = LoadingState.COMPLETE
			this.classJobs = classJobs
		} catch {
			// TODO: proper error handling
			this.state = LoadingState.WAITING
		}
	})
}
