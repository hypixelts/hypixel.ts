export * from './lib/index';

/**
 * The client options.
 * @category Interfaces
 */
export interface ClientOptions {
	/**
	 * A list of hypixel API keys. Only one will be used at a time.
	 * If the API returns a 403/429 error with one key, the next in the list will be used.
	 * This is optional to provide as some managers support non auth requests.
	 */
	apiKeys?: string[] | null;

	/**
	 * Enable debug mode. This will log all requests and responses to the console.
	 * For more verbose logging, set this to 'trace'.
	 */
	debug?: boolean | 'trace';

	/**
	 * The base hypixel api url
	 * @private
	 */
	baseApiUrl?: string;
}
