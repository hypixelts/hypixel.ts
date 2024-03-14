import { Base } from '.';
import { Client, APIGuild } from '../';

/**
 * The guild class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/Player-Data/paths/~1guild/get}
 */
export class Guild extends Base {
	public constructor(client: Client, data: APIGuild) {
		super(client);
		data.id = data._id;
		Object.assign(this, data);
	}
}
