import { Client } from '../Client';

/**
 * The base class which all other classes extend from.
 * @category Classes
 * @group Classes
 */
export class Base {
	/**
	 * The instantiated hypixel.ts client.
	 */
	protected client: Client;

	public constructor(client: Client) {
		this.client = client;
	}
}
