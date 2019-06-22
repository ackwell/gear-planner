import {observable, action, reaction, computed, runInAction} from 'mobx'
import {RequestModel} from 'models/request'
import {findEquipment} from 'api/equipment'
import {StatStore, statStore} from './stat'
import {isDefined} from 'utils'
import {ClassJobModel} from 'models/classJob'
import {EquipmentModel} from 'models/equipment'
import {getItemLevels} from 'api/itemLevel'
import {ItemLevelModel} from 'models/itemLevel'

export class GearPlannerStore {
	@observable.ref classJob?: ClassJobModel
	@observable.ref selectedEquipment?: EquipmentModel

	private statStore: StatStore
	private equipReq = new RequestModel({query: findEquipment})
	@observable private ilvCache = new Map<ItemLevelModel['id'], ItemLevelModel>()
	private ilvReq = new RequestModel({query: getItemLevels})

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

	@computed private get currentItemLevelIds() {
		// Find the set of ilvs for the new equip set
		return Array.from(
			this.equipment.reduce(
				(acc, cur) => acc.add(cur.itemLevel),
				new Set<number>(),
			),
		)
	}

	@computed get itemLevels() {
		const ids = this.currentItemLevelIds

		const ilvs = ids.map(id => this.ilvCache.get(id)).filter(isDefined)

		// If we're missing any, don't provide a partial set - this will update again
		// once the request is resolved.
		// TODO: Should I just present the partial set?
		if (ilvs.length < ids.length) {
			return []
		}

		return ilvs
	}

	constructor(opts: {statStore: StatStore}) {
		this.statStore = opts.statStore

		reaction(() => this.classJob, this.reactToClassJob)
		reaction(() => this.currentItemLevelIds, this.reactToItemLevelIds)
	}

	@action setClassJob(classJob: ClassJobModel) {
		this.classJob = classJob
	}

	@action selectEqipment(equipment: EquipmentModel) {
		this.selectedEquipment = equipment
	}

	// Request a list of equipment on CJ update
	@action.bound private reactToClassJob(classJob?: ClassJobModel) {
		this.selectedEquipment = undefined
		classJob && this.equipReq.execute({abbreviation: classJob.abbreviation})
	}

	// Ensure we have cached data for all the current item levels
	@action.bound private async reactToItemLevelIds(ids: number[]) {
		const missing = ids.filter(id => !this.ilvCache.has(id))
		if (missing.length === 0) {
			return
		}

		const ilvs = await this.ilvReq.execute({ids: missing})
		if (!ilvs) {
			return
		}

		runInAction(() =>
			ilvs.forEach(ilv => {
				const model = ItemLevelModel.fromResponse(ilv)
				this.ilvCache.set(model.id, model)
			}),
		)
	}
}

export const gearPlannerStore = new GearPlannerStore({statStore})
