import { BaseManager } from '.';
import type { Guild } from '../classes';
import { RequestData, type Client } from '../lib';

export class GuildManager extends BaseManager {
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Fetch a guild
	 * @param {String} id: The guild ID, name or a player ID.
	 * @param {String} type: The type of the ID you provided, either 'id', 'player' or 'name'.
	 */
	public async fetch(id: string, type: 'id' | 'player' | 'name'): Promise<Guild> {
		const queryParam: { id?: string; player?: string; name?: string } = {};

		switch (type) {
			case 'id':
			case 'player':
			case 'name':
				queryParam[type] = id;
		}

		const query = new RequestData({ query: queryParam });
		const { guild } = await this.client.api.guild.get(query);
		return guild;
	}
}
