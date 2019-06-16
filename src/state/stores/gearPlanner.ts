import {observable, action, reaction, computed} from 'mobx'
import {ClassJob} from 'api/classJob'
import {RequestModel} from 'state/models/request'
import {findEquipment} from 'api/equipment'
import {PlannerEquipmentModel} from 'state/models/plannerEquipment'
import {StatStore, statStore} from './stat'
import {isDefined} from 'utils'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJob
	@observable equipment: PlannerEquipmentModel[] = []

	private statStore: StatStore
	private equipReq = new RequestModel({query: findEquipment})

	@computed get visibleStats() {
		// TODO: this, but better
		const statIds = Array.from(
			this.equipment.reduce((acc, cur) => {
				cur.stats.forEach(stat => acc.add(stat.id))
				return acc
			}, new Set<number>()),
		)

		return statIds
			.map(id => this.statStore.stats.find(stat => stat.id === id))
			.filter(isDefined)
			.filter(stat => stat.order !== undefined)
			.sort((a, b) => a.order! - b.order!)
	}

	constructor(opts: {statStore: StatStore}) {
		this.statStore = opts.statStore
		// TODO: I really need to re-think the .load calls
		this.statStore.load()

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

export const gearPlannerStore = new GearPlannerStore({statStore})
