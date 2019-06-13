import {observable, action, reaction, computed} from 'mobx'
import {ClassJob} from '../api'
import {Request} from './request'
import {findEquipment} from '../api/equipment'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJob

	@observable private equipReq = new Request({query: findEquipment})

	constructor() {
		reaction(
			() => this.classJob,
			classJob => classJob && this.equipReq.execute({classJob}),
		)
	}

	@computed get equipment() {
		return this.equipReq.response || []
	}

	@action setClassJob(classJob: ClassJob) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore()
