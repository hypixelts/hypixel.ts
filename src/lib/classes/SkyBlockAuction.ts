import { Base } from './Base';
import type { Client } from '../Client';
import type { APISkyBlockAuction } from '../typings';

export interface SkyBlockAuction extends APISkyBlockAuction {}
/**
 * The sky block auction class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1auction/get}
 */
export class SkyBlockAuction extends Base {
	/**
	 * @param client Instantiated (and started) hypixel.ts client
	 * @param data SkyBlock auction data received from API
	 */
	public constructor(client: Client, data: APISkyBlockAuction) {
		super(client);
		if ('_id' in data) data.id = data._id;
		Object.assign(this, data);
	}
}
