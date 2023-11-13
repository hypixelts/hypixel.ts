import { Base } from '.';
import { Client, APIGuild } from '../';

/**
 * The guild class
 * @category Classes
 * @group Classes
 */
export class Guild extends Base {
	public constructor(client: Client, data: APIGuild) {
		super(client);
		data.id = data._id;
		Object.assign(this, data);
	}
}
