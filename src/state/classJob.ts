import {observable} from 'mobx'

interface ClassJob {
	id: number
	abbreviation: string
}

export class ClassJobStore {
	// TODO: like, load this, lol
	@observable.ref classJobs: ClassJob[] = [
		{id: 1, abbreviation: 'GLD'},
		{id: 2, abbreviation: 'PGL'},
	]
}
