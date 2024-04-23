import { Base } from './Base';
import type { Client } from '../Client';
import type { APISkyBlockProfile } from '../typings';

export interface SkyBlockProfile extends APISkyBlockProfile {}
/**
 * The SkyBlockProfile class.
 * @category Classes
 * @Group Classes
 * @see {@link https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1profile/get}
 */
export class SkyBlockProfile extends Base {
	/**
	 * @param client Instantiated (and started) hypixel.ts client
	 * @param data SkyBlock profile data received from API
	 */
	public constructor(client: Client, data: APISkyBlockProfile) {
		super(client);
		Object.assign(this, data);
	}
}
