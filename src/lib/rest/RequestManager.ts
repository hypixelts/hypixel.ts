import { AsyncQueue } from '@sapphire/async-queue';
import { ApiRequest } from './ApiRequest';
import { Client } from '../Client';

/**
 * Manages the requests to the API
 * @category Rest
 */
export class RequestManager {
	/**
	 * The hypixel.ts client instance
	 */
	public client: Client;

	/**
	 * The base url of the hypixel API
	 */
	public baseApiUrl: string;

	/**
	 * Queue for requests
	 * @see {@link https://npmjs.com/@sapphire/async-queue}
	 */
	private queue: AsyncQueue;

	public constructor(client: Client) {
		this.client = client;
		this.baseApiUrl = client.options.baseApiUrl ?? 'https://api.hypixel.net';
		this.queue = new AsyncQueue();
	}

	/**
	 * Makes the api request and pushes it to the request queue
	 */
	public async execute<T>(path: string) {
		await this.queue.wait();
		try {
			const request = await new ApiRequest(this, { path }).make();
			return request.json() as T;
		} finally {
			this.queue.shift();
		}
	}
}
