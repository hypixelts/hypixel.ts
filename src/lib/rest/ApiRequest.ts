import { RequestManager, HypixelAPIError, type HypixelAPIErrorResponse } from '.';
import { HypixelTSError } from '../errors';

/**
 * The options supplied to the request
 */
export interface ApiRequestOptions {
	/**
	 * The request method, only `GET` is supported
	 */
	method?: 'GET';

	/**
	 * The request path/endpoint
	 */
	path: string;
}

/**
 * Handles (sending/building options) requests
 * @category Rest
 */
export class ApiRequest {
	/**
	 * The request manager instance
	 */
	public requests: RequestManager;

	/**
	 * The options of this request
	 */
	public options: ApiRequestOptions;

	public constructor(requestManager: RequestManager, options: ApiRequestOptions) {
		this.requests = requestManager;
		this.options = options;
	}

	/**
	 * Makes a request with the options provided.
	 */
	public async make() {
		const options = this.buildOptions();

		const res = await fetch(options.url, {
			...options
		});

		if (!res.ok) {
			const error = (await res.json()) as HypixelAPIErrorResponse;
			throw new HypixelAPIError(error?.cause ?? res.statusText, res.status);
		}

		return res;
	}

	/**
	 * Creates an object containing the options to be passed to the request
	 */
	public buildOptions() {
		const { apiKey } = this.requests.client.options;

		if (!apiKey) throw new HypixelTSError('CLIENT_OPTIONS_MISSING', 'apiKey');

		const options = {
			url: `${this.requests.baseApiUrl}${this.options.path}`,
			method: this.options.method ?? 'GET',
			headers: {
				'Content-Type': 'application/json',
				'API-Key': this.requests.client.options.apiKey
			}
		};

		return options;
	}
}
