import {EquipmentModel} from './equipment'

export class PlannerEquipmentModel {
	private baseEquip: EquipmentModel

	get id() {
		return this.baseEquip.id
	}

	get name() {
		return this.baseEquip.name
	}

	get itemLevel() {
		return this.baseEquip.itemLevel
	}

	get stats() {
		return this.baseEquip.stats
	}

	constructor(opts: {equipment: EquipmentModel}) {
		this.baseEquip = opts.equipment
	}
}
