import { RequestManager, HypixelAPIError, type HypixelAPIErrorResponse } from './index';
import { HypixelTSError } from '../errors/index';

/**
 * The options supplied to the request
 * @category Rest
 * @group Rest
 */
export interface ApiRequestOptions {
	/**
	 * The request path/endpoint
	 */
	path: string;

	/**
	 * The request method, only `GET` is supported
	 */
	method?: 'GET';

	/**
	 * Whether to send the API key for this request
	 */
	sendAPIKey?: boolean;
}

/**
 * Handles (sending/building options) requests
 * @category Rest
 * @group Rest
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
		const apiKey = this.requests.client.options?.apiKey;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		if (this.options.sendAPIKey) {
			if (!apiKey) throw new HypixelTSError('CLIENT_OPTIONS_MISSING', 'apiKey');
			headers['API-Key'] = apiKey;
		}

		const options = {
			url: `${this.requests.baseApiUrl}${this.options.path}`,
			method: this.options.method ?? 'GET',
			headers
		};

		return options;
	}
}
