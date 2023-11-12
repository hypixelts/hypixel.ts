import type { Client } from '../Client';

/**
 * The base manager which all other managers extend from
 * @category Managers
 */
export class BaseManager {
	/**
	 * Whether or not the manager requires API key authorization.
	 */
	protected requiresAuth: boolean;

	/**
	 * The instantiated hypixel.ts client
	 */
	protected client: Client;

	public constructor(client: Client, requiresAuth: boolean) {
		this.client = client;
		this.requiresAuth = requiresAuth;
	}

	/**
	 * Calls the request manager to create (and execute) requests to the API.
	 *
	 * **NOTE**: Do not directly use this method unless you know what you are doing. Consider using the methods provided in the managers.
	 * @param path The path/endpoint of the request
	 * @private
	 */
	protected async makeGetRequest<T>(path: string) {
		return this.client.requests.execute<T>(path, this.requiresAuth);
	}
}
