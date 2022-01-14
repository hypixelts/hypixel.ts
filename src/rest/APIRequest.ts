import petitio, { PetitioResponse } from 'petitio';
import { HypixelJSError } from '../errors';
import type { Client } from '../lib';
import type { RestManager } from './RestManager';
import type { RequestData, ExtendedRequestData } from '../lib/util';
import type { methods } from './APIRouter';
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
	public constructor(rest: RestManager, method: methods, path: string, options: ExtendedRequestData<unknown, unknown>) {
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

	public async make(): Promise<PetitioResponse> {
		const { apiKey } = this.client;

		const headers: HeadersInit = {};
		if (!apiKey) throw new HypixelJSError('CLIENT_OPTION_MISSING', 'apiKey');
		headers['API-Key'] = apiKey;

		let body = {};
		if (this.method !== 'get' && this.options.body) {
			body = JSON.stringify(this.options.body);
			headers['Content-Type'] = 'application/json';
		}
		return petitio(`https://api.hypixel.net${this.path}`).body(body, 'json').header(headers).send();
	}
}
