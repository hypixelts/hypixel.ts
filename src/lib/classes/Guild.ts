import { Base } from './Base';
import type { Client } from '../Client';
import type { APIGuild } from '../typings';

/**
 * The guild class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/Player-Data/paths/~1guild/get}
 */
export class Guild extends Base {
	/**
	 * @param client Instantiated (and started) hypixel.ts client
	 * @param data Guild data received from API
	 */
	public constructor(client: Client, data: APIGuild) {
		super(client);
		data.id = data._id;
		Object.assign(this, data);
	}
}
