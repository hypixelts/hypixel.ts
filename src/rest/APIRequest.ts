import { request, Dispatcher } from 'undici';
import { HypixelTSError } from '../errors';
import type { RestManager } from '.';
import type { Client, RequestData, ExtendedRequestData } from '../lib';
import type { HeadersInit } from '../typings';

export interface APIRequest {
	rest: RestManager;
	method: string;
	path: string;
	options: RequestData<unknown, unknown>;
	route: string;
	client: Client;
}

export class APIRequest {
	/**
	 * The rest manager
	 */
	public rest: RestManager;

	/**
	 * The HTTP method of the request.
	 */
	public method: string;

	/**
	 * The path of the request.
	 */
	public path: string;

	/**
	 * Additional data, such as body and query parameters.
	 */
	public options: RequestData<unknown, unknown>;

	/**
	 * The route of the request.
	 */
	public route: string;

	/**
	 * The instantiated client.
	 */
	public client: Client;

	public constructor(rest: RestManager, method: string, path: string, options: ExtendedRequestData<unknown, unknown>) {
		this.rest = rest;
		this.method = method;
		this.path = path;
		this.options = options;
		this.route = options.route;
		this.client = rest.client;

		if (options.query && typeof options.query === 'object') {
			const queryString = Object.entries(options.query)
				.filter(([, value]) => value !== null && typeof value !== 'undefined')
				.map(([key, value]) => (Array.isArray(value) ? `${key}=${value.join(',')}` : `${key}=${value}`))
				.join('&');

			this.path = `${path}?${queryString}`;
		}
	}

	/**
	 * Makes a request to the API.
	 * @returns {Promise<ResponseData>}
	 */
	public async make(): Promise<Dispatcher.ResponseData> {
		const { apiKey } = this.client;

		const headers: HeadersInit = {};
		if (!apiKey) throw new HypixelTSError('CLIENT_OPTION_MISSING', 'apiKey');
		headers['API-Key'] = apiKey;

		let body = null;
		if (this.method !== 'get' && this.options.body) {
			body = JSON.stringify(this.options.body);
			headers['Content-Type'] = 'application/json';
		}

		return request(`https://api.hypixel.net${this.path}`, {
			body: body as string,
			headers
		});
	}
}
