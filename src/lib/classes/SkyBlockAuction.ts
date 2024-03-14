import { Base } from '.';
import type { Client, APISkyBlockAuction } from '..';

export interface SkyBlockAuction extends APISkyBlockAuction {}
/**
 * The sky block auction class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1auction/get}
 */
export class SkyBlockAuction extends Base {
	public constructor(client: Client, data: APISkyBlockAuction) {
		super(client);
		if ('_id' in data) data.id = data._id;
		Object.assign(this, data);
	}
}
