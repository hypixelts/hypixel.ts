import type { Client } from '../lib/Client';

/**
 * The base class which other classes extend from.
 */
export class BaseClass {
	/**
	 * The client that instantiated this class.
	 * @type {Client}
	 */
	public client: Client;
	public constructor(client: Client) {
		this.client = client;
	}
}
