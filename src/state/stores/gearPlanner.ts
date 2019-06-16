import {observable, action, reaction, computed} from 'mobx'
import {ClassJob} from 'api/classJob'
import {RequestModel} from 'state/models/request'
import {findEquipment} from 'api/equipment'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJob

	@observable private equipReq = new RequestModel({query: findEquipment})

	@computed get equipment() {
		return this.equipReq.response || []
	}

	constructor() {
		reaction(
			() => this.classJob,
			classJob => classJob && this.equipReq.execute({classJob}),
		)
	}

	@action setClassJob(classJob: ClassJob) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore()
