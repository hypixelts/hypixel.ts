import { BaseManager } from './BaseManager';
import { HypixelTSError } from '../errors/HypixelTSError';
import { Guild } from '../classes/Guild';
import type { APIGuild } from '../typings';
import type { Client } from '../Client';
import type { Logger } from '../Logger';

/**
 * Guild related endpoints
 * @category Managers
 * @group Managers
 */
export class GuildManager extends BaseManager {
	public constructor(client: Client, logger: Logger) {
		super(client, true, logger);
	}

	/**
	 * Fetch a guild by the guild id, or its name, or a player's guild by providing their uuid
	 * @param identifier The id/name of the guild or the uuid of the player
	 * @param type The type of identifier you're passing (id/name of guild, player uuid)
	 */
	public async fetch(identifier: string, type: 'id' | 'name' | 'player') {
		if (!identifier) throw new HypixelTSError('METHOD_MISSING_OPTION', 'GuildManager', 'fetch', 'identifier');
		if (!type) throw new HypixelTSError('METHOD_MISSING_OPTION', 'GuildManager', 'fetch', 'type');
		if (type !== 'id' && type !== 'name' && type !== 'player')
			throw new HypixelTSError('METHOD_INVALID_OPTIONS', 'GuildManager', 'fetch', 'type', ['id', 'name', 'player']);

		const { guild } = await this.makeGetRequest<{ guild: APIGuild | null }>(`/guild?${type}=${identifier}`);
		return guild ? new Guild(this.client, guild) : null;
	}
}
