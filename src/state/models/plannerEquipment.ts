import {Equipment} from 'api/equipment'

export class PlannerEquipmentModel {
	private baseEquip: Equipment

	get name() {
		return this.baseEquip.name
	}

	get stats() {
		return this.baseEquip.stats
	}

	constructor(opts: {equipment: Equipment}) {
		this.baseEquip = opts.equipment
	}
}
