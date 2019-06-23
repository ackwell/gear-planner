import {StatAmount} from './stat'
import {EquipmentResponse} from 'api/equipment'
import {observable, action, computed} from 'mobx'
import {MateriaModel} from './materia'
import {isDefined} from 'utils'
import {intrinsicStatMap} from 'data/stat'
import {ItemLevelModel} from './itemLevel'
import {StatStore} from 'stores/stat'

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

	// TODO: Advanced melding/overmelding
	@observable materia: MateriaSlots = [
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
	]

	@observable itemLevelModel?: ItemLevelModel

	private equipSlotCategory: number

	@computed private get adjusters(): Adjuster[] {
		const materiaAdjusters = this.materia
			.filter(isDefined)
			.map(materia => (stats: StatAmount[]) =>
				this.adjustStat(stats, materia.stat),
			)

		return [this.adjustWithHqStats, ...materiaAdjusters, this.adjustWithStatCaps]
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
		equipSlotCategory: number
	}) {
		this.id = opts.id
		this.name = opts.name
		this.itemLevel = opts.itemLevel
		this.materiaSlots = opts.materiaSlots
		this.baseStats = opts.baseStats
		this.statHqModifiers = opts.statHqModifiers
		this.equipSlotCategory = opts.equipSlotCategory
	}

	@action setMateria(slot: number, materia?: MateriaModel) {
		// TODO: sanity check the slot no.
		this.materia[slot] = materia
	}

	private adjustWithHqStats = (stats: StatAmount[]) =>
		this.statHqModifiers.reduce((acc, cur) => this.adjustStat(acc, cur), stats)

	private adjustStat(stats: StatAmount[], adjustBy: StatAmount) {
		const newStats = stats.slice()

		const index = newStats.findIndex(stat => stat.stat.id === adjustBy.stat.id)
		if (index !== -1) {
			newStats.splice(index, 1, {
				...adjustBy,
				amount: newStats[index].amount + adjustBy.amount,
			})
		} else {
			newStats.push({...adjustBy})
		}

		return newStats
	}

	private adjustWithStatCaps = (stats: StatAmount[]) => {
		if (!this.itemLevelModel) {
			return stats
		}

		const newStats = stats.slice()

		this.itemLevelModel.stats.forEach(ilvStat => {
			const index = newStats.findIndex(stat => stat.stat.id === ilvStat.stat.id)
			if (index === -1) {
				return
			}
			const stat = newStats[index]

			const slotCap = stat.stat.slotCaps.find(
				cap => cap.slot === this.equipSlotCategory,
			)
			const capPct = slotCap ? slotCap.percent : 0
			const statCap = Math.round(ilvStat.amount * (capPct / 100))

			if (stat.amount > statCap) {
				console.log(this.name, stat.amount, statCap)
				newStats.splice(index, 1, {
					...stat,
					amount: statCap,
				})
			}
		})

		return newStats
	}

	// TOOD: Look into cleaning this up, it's disgusting
	static fromResponse = (
		resp: EquipmentResponse,
		opts: {statStore: StatStore},
	) =>
		new EquipmentModel({
			id: resp.ID,
			name: resp.Name,
			itemLevel: resp.LevelItem,
			equipSlotCategory: resp.EquipSlotCategoryTargetID,
			materiaSlots: resp.MateriaSlotCount,
			baseStats: [
				{id: intrinsicStatMap.DamagePhys, amount: resp.DamagePhys},
				{id: intrinsicStatMap.DamageMag, amount: resp.DamageMag},
				{id: intrinsicStatMap.BlockRate, amount: resp.BlockRate},
				{id: intrinsicStatMap.Block, amount: resp.Block},
				{id: intrinsicStatMap.DefensePhys, amount: resp.DefensePhys},
				{id: intrinsicStatMap.DefenseMag, amount: resp.DefenseMag},
				{id: resp.BaseParam0TargetID, amount: resp.BaseParamValue0},
				{id: resp.BaseParam1TargetID, amount: resp.BaseParamValue1},
				{id: resp.BaseParam2TargetID, amount: resp.BaseParamValue2},
				{id: resp.BaseParam3TargetID, amount: resp.BaseParamValue3},
				{id: resp.BaseParam4TargetID, amount: resp.BaseParamValue3},
				{id: resp.BaseParam5TargetID, amount: resp.BaseParamValue5},
			]
				.filter(stat => stat.id !== 0 && stat.amount !== 0)
				.map(stat => toStatAmount(stat, opts)),
			statHqModifiers: [
				{id: resp.BaseParamSpecial0TargetID, amount: resp.BaseParamValueSpecial0},
				{id: resp.BaseParamSpecial1TargetID, amount: resp.BaseParamValueSpecial1},
				{id: resp.BaseParamSpecial2TargetID, amount: resp.BaseParamValueSpecial2},
				{id: resp.BaseParamSpecial3TargetID, amount: resp.BaseParamValueSpecial3},
				{id: resp.BaseParamSpecial4TargetID, amount: resp.BaseParamValueSpecial3},
				{id: resp.BaseParamSpecial5TargetID, amount: resp.BaseParamValueSpecial5},
			]
				.filter(stat => stat.id !== 0)
				.map(stat => toStatAmount(stat, opts)),
		})
}

const toStatAmount = (
	raw: {id: number; amount: number},
	opts: {statStore: StatStore},
): StatAmount => ({
	stat: opts.statStore.forId(raw.id),
	amount: raw.amount,
})
