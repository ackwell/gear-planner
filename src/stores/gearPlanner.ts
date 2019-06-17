import {observable, action, reaction, computed} from 'mobx'
import {RequestModel} from 'models/request'
import {findEquipment} from 'api/equipment'
import {StatStore, statStore} from './stat'
import {isDefined} from 'utils'
import {ClassJobModel} from 'models/classJob'
import {EquipmentModel} from 'models/equipment'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJobModel
	@observable equipment: EquipmentModel[] = []

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

		// Re-request the core list of equipment when filters are changed
		reaction(
			() => this.classJob,
			classJob =>
				classJob && this.equipReq.execute({abbreviation: classJob.abbreviation}),
		)

		// When the raw equipment is changed, re-build our planner repr and kick off
		// a req for new item level data
		// TODO: Worth caching ilv?
		reaction(
			() => this.equipReq.response,
			(equips = []) => {
				// Build new equipment repr
				this.equipment = equips.map(EquipmentModel.fromResponse)

				// Find the set of ilvs for the new equip set
				const ilvs = Array.from(
					this.equipment.reduce(
						(acc, cur) => acc.add(cur.itemLevel),
						new Set<number>(),
					),
				)

				// TODO: fire request
				console.log(ilvs)
			},
		)
	}

	@action setClassJob(classJob: ClassJobModel) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore({statStore})
