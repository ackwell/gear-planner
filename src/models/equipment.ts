import {StatAmount} from './stat'
import {EquipmentResponse} from 'api/equipment'
import {createTransformer} from 'mobx-utils'
import {observable, action} from 'mobx'
import {MateriaModel} from './materia'

type PossibleMateria = MateriaModel | undefined

export class EquipmentModel {
	id: number
	name: string
	itemLevel: number
	materiaSlots: number
	stats: StatAmount[]
	statHqModifiers: StatAmount[]

	@observable materia: PossibleMateria[] = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	]

	constructor(opts: {
		id: number
		name: string
		itemLevel: number
		materiaSlots: number
		stats: StatAmount[]
		statHqModifiers: StatAmount[]
	}) {
		this.id = opts.id
		this.name = opts.name
		this.itemLevel = opts.itemLevel
		this.materiaSlots = opts.materiaSlots
		this.stats = opts.stats
		this.statHqModifiers = opts.statHqModifiers
	}

	@action setMateria(slot: number, materia?: MateriaModel) {
		// TODO: sanity check the slot no.
		this.materia[slot] = materia
		console.log(this.materia)
	}

	static fromResponse = createTransformer(
		(resp: EquipmentResponse) =>
			new EquipmentModel({
				id: resp.ID,
				name: resp.Name,
				itemLevel: resp.LevelItem,
				materiaSlots: resp.MateriaSlotCount,
				stats: [
					{id: resp.BaseParam0TargetID, amount: resp.BaseParamValue0},
					{id: resp.BaseParam1TargetID, amount: resp.BaseParamValue1},
					{id: resp.BaseParam2TargetID, amount: resp.BaseParamValue2},
					{id: resp.BaseParam3TargetID, amount: resp.BaseParamValue3},
					{id: resp.BaseParam4TargetID, amount: resp.BaseParamValue3},
					{id: resp.BaseParam5TargetID, amount: resp.BaseParamValue5},
				].filter(stat => stat.id !== 0),
				statHqModifiers: [
					{id: resp.BaseParamSpecial0TargetID, amount: resp.BaseParamValueSpecial0},
					{id: resp.BaseParamSpecial1TargetID, amount: resp.BaseParamValueSpecial1},
					{id: resp.BaseParamSpecial2TargetID, amount: resp.BaseParamValueSpecial2},
					{id: resp.BaseParamSpecial3TargetID, amount: resp.BaseParamValueSpecial3},
					{id: resp.BaseParamSpecial4TargetID, amount: resp.BaseParamValueSpecial3},
					{id: resp.BaseParamSpecial5TargetID, amount: resp.BaseParamValueSpecial5},
				].filter(stat => stat.id !== 0),
			}),
	)
}
