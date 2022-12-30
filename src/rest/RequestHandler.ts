import { AsyncQueue } from '@sapphire/async-queue';
import { HypixelAPIError, HypixelAPIErrorResponse, type APIRequest, type RestManager } from '.';

export class RequestHandler {
	/**
	 * The rest manager.
	 */
	public manager: RestManager;

	/**
	 * The queue the requests are pushed to.
	 */
	public queue: AsyncQueue;

	public constructor(manager: RestManager) {
		this.manager = manager;
		this.queue = new AsyncQueue();
	}

	/**
	 * Pushes the request to the queue and executes it.
	 * @param {APIRequest} request: The request to execute.
	 */
	public async push(request: APIRequest) {
		await this.queue.wait();
		try {
			return await this.execute(request);
		} finally {
			this.queue.shift();
		}
	}

	/**
	 * Executes a request.
	 * @param {APIRequest} request: The request to execute.
	 */
	public async execute(request: APIRequest) {
		const res = await request.make();
		if (res.statusCode! <= 400) return res.body.json();

		const apiError = (await res.body.json()) as HypixelAPIErrorResponse;
		throw new HypixelAPIError(apiError.cause, res.statusCode!);
	}
}
