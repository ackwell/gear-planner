import {observable, action, reaction, computed} from 'mobx'
import {ClassJob} from 'api/classJob'
import {RequestModel} from 'state/models/request'
import {findEquipment} from 'api/equipment'
import {PlannerEquipmentModel} from 'state/models/plannerEquipment'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJob
	@observable equipment: PlannerEquipmentModel[] = []

	@observable private equipReq = new RequestModel({query: findEquipment})

	constructor() {
		// Re-request the core list of equipment when filters are changed
		reaction(
			() => this.classJob,
			classJob => classJob && this.equipReq.execute({classJob}),
		)

		// When the raw equipment is changed, re-build our planner repr
		reaction(
			() => this.equipReq.response,
			equips => {
				this.equipment = equips
					? equips.map(equipment => new PlannerEquipmentModel({equipment}))
					: []
			},
		)
	}

	@action setClassJob(classJob: ClassJob) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore()