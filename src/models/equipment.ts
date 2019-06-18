import {StatAmount} from './stat'
import {EquipmentResponse} from 'api/equipment'
import {createTransformer} from 'mobx-utils'
import {observable, action, computed} from 'mobx'
import {MateriaModel} from './materia'
import {isDefined} from 'utils'

type PossibleMateria = MateriaModel | undefined
type MateriaSlots = [
	PossibleMateria,
	PossibleMateria,
	PossibleMateria,
	PossibleMateria,
	PossibleMateria,
]

type Adjuster = (stats: StatAmount[]) => StatAmount[]

export class EquipmentModel {
	id: number
	name: string
	itemLevel: number
	materiaSlots: number
	baseStats: StatAmount[]
	statHqModifiers: StatAmount[]

	@observable materia: MateriaSlots = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	]

	@computed private get adjusters(): Adjuster[] {
		const materiaAdjusters = this.materia
			.filter(isDefined)
			.map(materia => (stats: StatAmount[]) =>
				this.adjustStatsWithMateria(stats, materia),
			)

		return [
			// TODO: HQ modifiers
			...materiaAdjusters,
			// TODO: Stat caps
		]
	}

	@computed get stats() {
		return this.adjusters.reduce((stats, adj) => adj(stats), this.baseStats)
	}

	constructor(opts: {
		id: number
		name: string
		itemLevel: number
		materiaSlots: number
		baseStats: StatAmount[]
		statHqModifiers: StatAmount[]
	}) {
		this.id = opts.id
		this.name = opts.name
		this.itemLevel = opts.itemLevel
		this.materiaSlots = opts.materiaSlots
		this.baseStats = opts.baseStats
		this.statHqModifiers = opts.statHqModifiers
	}

	@action setMateria(slot: number, materia?: MateriaModel) {
		// TODO: sanity check the slot no.
		this.materia[slot] = materia
	}

	private adjustStatsWithMateria(stats: StatAmount[], materia: MateriaModel) {
		const newStats = stats.slice()

		const index = newStats.findIndex(stat => stat.id === materia.stat.id)
		if (index !== -1) {
			newStats.splice(index, 1, {
				...materia.stat,
				amount: newStats[index].amount + materia.stat.amount,
			})
		} else {
			newStats.push({...materia.stat})
		}

		return newStats
	}

	static fromResponse = createTransformer(
		(resp: EquipmentResponse) =>
			new EquipmentModel({
				id: resp.ID,
				name: resp.Name,
				itemLevel: resp.LevelItem,
				materiaSlots: resp.MateriaSlotCount,
				baseStats: [
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
