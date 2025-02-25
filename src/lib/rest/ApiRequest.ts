import { RequestManager, HypixelAPIError, type HypixelAPIErrorResponse } from './index';
import { HypixelTSError } from '../errors/index';

export interface ApiRequestOptions {
	path: string;
	method?: 'GET';
	sendAPIKey?: boolean;
}

export class ApiRequest {
	public requests: RequestManager;
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

		if (!this.options.sendAPIKey) {
			return this.makeRequest(options);
		}

		const apiKeys = this.requests.client.options?.apiKeys ?? [];

		if (!apiKeys.length) {
			throw new HypixelTSError('CLIENT_OPTIONS_MISSING', 'apiKeys');
		}

		return this.makeRequestWithKeys(options, apiKeys);
	}

	/**
	 * Make a request with the provided API keys until successful request or exhaustion
	 */
	private async makeRequestWithKeys(options: ReturnType<typeof this.buildOptions>, apiKeys: string[]) {
		const errors: HypixelAPIError[] = [];

		for (let i = 0; i < apiKeys.length; i++) {
			try {
				const requestOptions = {
					...options,
					headers: {
						...options.headers,
						'API-Key': apiKeys[i]
					}
				};
				const res = await this.makeRequest(requestOptions);

				if (!res.ok) {
					const json = (await res.json()) as HypixelAPIErrorResponse;
					const errorMessage = `${json.cause} [API key ${i + 1}]`;

					if (res.status === 403 || res.status === 429) {
						throw new HypixelAPIError(errorMessage, res.status);
					}

					throw new HypixelAPIError(json.cause, res.status);
				}

				return res;
			} catch (error) {
				if (error instanceof HypixelAPIError && (error.code === 403 || error.code === 429)) {
					errors.push(error);
					continue;
				}
				throw error;
			}
		}

		if (errors.length > 0) {
			throw new AggregateError(errors, `All ${apiKeys.length} API keys have been exhausted with no successful requests.`);
		}

		throw new HypixelTSError('API_KEYS_EXHAUSTED', apiKeys.length);
	}

	private async makeRequest(options: ReturnType<typeof this.buildOptions>) {
		return fetch(options.url, { ...options });
	}

	/**
	 * Creates an object containing the options to be passed to the request
	 */
	private buildOptions() {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		const options = {
			url: `${this.requests.baseApiUrl}${this.options.path}`,
			method: this.options.method ?? 'GET',
			headers
		};

		return options;
	}
}
