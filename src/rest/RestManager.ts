import { Collection } from '@discordjs/collection';
import { APIRequest, RequestHandler, buildRoute } from '.';
import type { Client, ExtendedRequestData } from '../lib';

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

	public async request(method: string, path: string, options: ExtendedRequestData<unknown, unknown>) {
		const apiRequest = new APIRequest(this, method, path, options);
		let handler = this.requestHandlers.get(apiRequest.route);
		if (!handler) {
			handler = new RequestHandler(this);
			this.requestHandlers.set(apiRequest.route, handler);
		}
		return handler.push(apiRequest);
	}
}
