import { Collection } from '@discordjs/collection';
import { buildRoute, methods } from './APIRouter';
import { APIRequest } from './APIRequest';
import { RequestHandler } from './RequestHandler';
import type { Client } from '../lib';
import type { ExtendedRequestData } from '../lib/util';

/**
 * Manager class for the rest API
 */
export class RestManager {
	/**
	 * The instance of {@link Client}.
	 */
	public client: Client;

	/**
	 * The base URL of the api.
	 */
	public baseURL: string;

	/**
	 * The collection of request handlers
	 */
	public requestHandlers: Collection<string, RequestHandler>;

	/**
	 * @param client The instantiated {@link Client} instance.
	 */
	public constructor(client: Client) {
		this.client = client;
		this.baseURL = 'https://api.hypixel.net/';
		this.requestHandlers = new Collection();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get routeBuilder(): any {
		return buildRoute(this);
	}

	public async request(method: methods, path: string, options: ExtendedRequestData<unknown, unknown>) {
		const apiRequest = new APIRequest(this, method, path, options);
		let handler = this.requestHandlers.get(apiRequest.route);
		if (!handler) {
			handler = new RequestHandler(this);
			this.requestHandlers.set(apiRequest.route, handler);
		}
		return handler.push(apiRequest);
	}
}
