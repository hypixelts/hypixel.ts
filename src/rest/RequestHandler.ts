import { AsyncQueue } from '@sapphire/async-queue';
import { HypixelAPIError, HypixelAPIErrorResponse } from './HypixelAPIError';
import { parseResponse } from '../lib/util';
import type { APIRequest } from './APIRequest';
import type { RestManager } from './RestManager';

export class RequestHandler {
	public manager: RestManager;
	public queue: AsyncQueue;

	public constructor(manager: RestManager) {
		this.manager = manager;
		this.queue = new AsyncQueue();
	}

	public async push(request: APIRequest) {
		await this.queue.wait();
		try {
			return await this.execute(request);
		} finally {
			this.queue.shift();
		}
	}

	public async execute(request: APIRequest) {
		const res = await request.make();
		if (res.statusCode! <= 400) return parseResponse(res);

		const apiError = (await parseResponse(res)) as unknown as HypixelAPIErrorResponse;
		throw new HypixelAPIError(apiError.cause, res.statusCode!);
	}
}
