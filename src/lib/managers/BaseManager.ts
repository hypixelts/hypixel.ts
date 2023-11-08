import { Client } from '../Client';

/**
 * The base manager which all other managers extend from
 * @category Managers
 */
export class BaseManager {
	/**
	 * The instantiated hypixel.ts client
	 */
	public client: Client;

	public constructor(client: Client) {
		this.client = client;
	}

	/**
	 * Calls the request manager to create (and execute) requests to the API
	 * @param path The path/endpoint of the request
	 */
	public async makeGetRequest<T>(path: string) {
		return this.client.requests.execute<T>(path);
	}
}
