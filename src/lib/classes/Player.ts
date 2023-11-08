import { Base } from '.';
import { Client } from '../Client';
import { APIPlayer } from '../typings';

export interface Player extends APIPlayer {}
/**
 * The player class
 * @category Classes
 * @see {@link https://api.hypixel.net/#tag/Player-Data/paths/~1player/get}
 */
export class Player extends Base {
	public constructor(client: Client, data: APIPlayer) {
		super(client);
		Object.assign(this, data);
	}
}
