import { Base } from './Base';
import type { Client } from '../Client';
import type { APISkyBlockMuseum } from '../typings';

export interface SkyBlockMuseum extends APISkyBlockMuseum {}
/**
 * The SkyBlockMuseum class.
 * @category Classes
 * @Group Classes
 */
export class SkyBlockMuseum extends Base {
	/**
	 * @param client Instantiated (and started) hypixel.ts client
	 * @param data SkyBlock profile data received from API
	 */
	public constructor(client: Client, data: APISkyBlockMuseum) {
		super(client);
		Object.assign(this, data);
	}
}
