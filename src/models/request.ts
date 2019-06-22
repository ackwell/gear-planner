import {observable, flow} from 'mobx'

export enum LoadingState {
	WAITING,
	LOADING,
	COMPLETE,
	ERRORED,
}

type QueryFunction = (...params: any[]) => any
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type UnwRet<T extends QueryFunction> = UnwrapPromise<ReturnType<T>>

export class RequestModel<F extends QueryFunction> {
	@observable.ref state: LoadingState = LoadingState.WAITING
	@observable.ref response?: UnwRet<F>

	private query: (...params: Parameters<F>) => ReturnType<F>

	constructor(opts: {query: F}) {
		this.query = opts.query
	}

	execute = flow(function*(this: RequestModel<F>, ...params: Parameters<F>) {
		// TODO: this should probably cancel, not noop
		if (this.state === LoadingState.LOADING) {
			return
		}

		this.state = LoadingState.LOADING

		try {
			const response = (yield this.query(...params)) as UnwRet<F>
			this.state = LoadingState.COMPLETE
			this.response = response
			return response
		} catch {
			this.state = LoadingState.ERRORED
		}
	})
}
