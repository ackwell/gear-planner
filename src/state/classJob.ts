import {observable, flow, computed} from 'mobx'
import {ClassJob, getClassJobs, ClassJobCategory} from '../api'

export enum LoadingState {
	WAITING,
	LOADING,
	COMPLETE,
}

export class ClassJobStore {
	@observable.ref state: LoadingState = LoadingState.WAITING
	@observable.ref classJobs: ClassJob[] = []

	@computed get categories(): readonly ClassJobCategory[] {
		const catMap = this.classJobs.reduce(
			(map, cj) => map.set(cj.category.id, cj.category),
			new Map<number, ClassJobCategory>(),
		)
		return Array.from(catMap.values())
	}

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

export const classJobStore = new ClassJobStore()
