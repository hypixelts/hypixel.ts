import type { Client } from '../lib';

/**
 * The base manager which other managers extend from.
 */
export class BaseManager {
	/**
	 * The client that instantiated this manager.
	 * @readonly
	 */
	public client!: Client;
	public constructor(client: Client) {
		Object.defineProperty(this, 'client', { value: client, enumerable: false });
	}
}
