export * from './lib';

/**
 * The client options.
 * @category Interfaces
 */
export interface ClientOptions {
	/**
	 * The hypixel api key.
	 * This is optional to provide as some managers support non auth requests.
	 */
	apiKey?: string;

	/**
	 * The base hypixel api url
	 * @private
	 */
	baseApiUrl?: string;
}
