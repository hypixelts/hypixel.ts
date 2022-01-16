import type { Client } from '../lib';

/**
 * The base manager which other managers extend from.
 */
export class BaseManager {
	/**
	 * The client that instantiated this manager.
	 * @type {Client}
	 * @readonly
	 */
	public client: Client;
	public constructor(client: Client) {
		this.client = client;
	}
}
