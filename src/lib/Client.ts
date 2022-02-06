import { RestManager } from '../rest';
import { HypixelTSError } from '../errors/HypixelTSError';
import { GuildManager, OtherManager, PlayerManager, ResourcesManager, SkyBlockManager } from '../managers';
import { Util } from '../classes';

export interface Client {
	/**
	 * The api key obtained from hypixel's `/api` command (in-game).
	 */
	apiKey: string;

	/**
	 * The rest manager used to make requests to the Hypixel API.
	 * @type {RestManager}
	 */
	rest: RestManager;

	/**
	 * The player manager used to access player related methods.
	 * @type {PlayerManager}
	 */
	players: PlayerManager;

	/**
	 * The SkyblockManager used to access skyblock related methods.
	 * @type {SkyBlockManager}
	 */
	skyblock: SkyBlockManager;

	/**
	 * The ResourcesManager used to access the resource related methods.
	 * @type {ResourcesManager}
	 */
	resources: ResourcesManager;

	/**
	 * The GuildManager used to access the guild related methods.
	 * @type {GuildManager}
	 */
	guilds: GuildManager;

	/**
	 * The OtherManager used to access the other related methods.
	 * @type {OtherManager}
	 */
	other: OtherManager;

	/**
	 * The Util class used to access the util related methods.
	 * @type {Util}
	 */
	util: Util;
}

/**
 * The client which is used to access the Hypixel API.
 * 
 * @example
 * ```typescript
 * import { Client } from '../src';

const client = new Client('API_KEY');

void client.players.fetch('armc').then((player) => {
	console.log(player);
});
```
*/

export class Client {
	public constructor(apiKey: string) {
		if (!apiKey) throw new HypixelTSError('CLIENT_OPTIONS_MISSING', 'apiKey');
		if (typeof apiKey !== 'string') throw new HypixelTSError('CLIENT_OPTION_INVALID_TYPE', 'apiKey', 'string');

		this.apiKey = apiKey;
		this.registerManagers();
	}

	public get api() {
		return this.rest.routeBuilder;
	}

	private registerManagers() {
		this.rest = new RestManager(this);
		this.players = new PlayerManager(this);
		this.skyblock = new SkyBlockManager(this);
		this.resources = new ResourcesManager(this);
		this.other = new OtherManager(this);
		this.guilds = new GuildManager(this);
		this.util = new Util(this);
	}
}
