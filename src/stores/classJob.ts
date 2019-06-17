import {observable, computed} from 'mobx'
import {getClassJobs} from 'api/classJob'
import {RequestModel, LoadingState} from 'models/request'
import {ClassJobModel, ClassJobCategory} from 'models/classJob'

export class ClassJobStore {
	@observable private request = new RequestModel({query: getClassJobs})

	@computed get classJobs() {
		return (this.request.response || []).map(ClassJobModel.fromResponse)
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
classJobStore.load()
