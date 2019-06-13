import {observable, computed, action} from 'mobx'
import {getClassJobs, ClassJobCategory} from '../api'
import {Request, LoadingState} from './request'

export class ClassJobStore {
	@observable request = new Request({query: getClassJobs})

	@computed get classJobs() {
		return this.request.response || []
	}

	@computed get categories(): readonly ClassJobCategory[] {
		const catMap = this.classJobs.reduce(
			(map, cj) => map.set(cj.category.id, cj.category),
			new Map<number, ClassJobCategory>(),
		)
		return Array.from(catMap.values())
	}

	load() {
		// Only need to load classjobs once
		if (this.request.state !== LoadingState.WAITING) {
			return
		}

		this.request.execute()
	}
}

export const classJobStore = new ClassJobStore()
