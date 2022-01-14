import { RestManager } from '../rest';
import { HypixelJSError } from '../errors/HypixelJSError';
import { PlayerManager, SkyBlockManager, ResourcesManager, OtherManager } from '../managers';
import { Util } from '../classes';

export interface Client {
	apiKey: string;
	rest: RestManager;
	players: PlayerManager;
	skyblock: SkyBlockManager;
	resources: ResourcesManager;
	other: OtherManager;
	util: Util;
}

export class Client {
	public constructor(apiKey: string) {
		if (!apiKey) throw new HypixelJSError('CLIENT_OPTIONS_MISSING', 'apiKey');
		if (typeof apiKey !== 'string') throw new HypixelJSError('CLIENT_OPTION_INVALID_TYPE', 'apiKey', 'string');

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
		this.util = new Util(this);
	}
}
