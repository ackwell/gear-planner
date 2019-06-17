import {observable, action, reaction, computed} from 'mobx'
import {RequestModel} from 'models/request'
import {findEquipment} from 'api/equipment'
import {StatStore, statStore} from './stat'
import {isDefined} from 'utils'
import {ClassJobModel} from 'models/classJob'
import {EquipmentModel} from 'models/equipment'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJobModel

	private statStore: StatStore
	private equipReq = new RequestModel({query: findEquipment})

	@computed get equipment() {
		return (this.equipReq.response || []).map(EquipmentModel.fromResponse)
	}

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

	// TODO: use this
	@computed private get itemLevels() {
		// Find the set of ilvs for the new equip set
		return Array.from(
			this.equipment.reduce(
				(acc, cur) => acc.add(cur.itemLevel),
				new Set<number>(),
			),
		)
	}

	constructor(opts: {statStore: StatStore}) {
		this.statStore = opts.statStore

		// Re-request the core list of equipment when filters are changed
		reaction(
			() => this.classJob,
			classJob =>
				classJob && this.equipReq.execute({abbreviation: classJob.abbreviation}),
		)
	}

	@action setClassJob(classJob: ClassJobModel) {
		this.classJob = classJob
	}
}

export const gearPlannerStore = new GearPlannerStore({statStore})
