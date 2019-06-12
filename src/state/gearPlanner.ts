import {observable, action} from 'mobx'
import {ClassJob} from '../api'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJob

	@action setClassJob(classJob: ClassJob) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore()
