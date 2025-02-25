import { PlayerManager, GuildManager, ResourceManager, OtherManager, SkyBlockManager } from './managers/index';
import { RequestManager } from './rest/index';
import { Logger } from './Logger';
import type { ClientOptions } from '../index';

/**
 * The hypixel.ts client.
 * @category Classes
 */
export class Client {
	public options?: ClientOptions;
	public requests!: RequestManager;
	public players!: PlayerManager;
	public guilds!: GuildManager;
	public resources!: ResourceManager;
	public others!: OtherManager;
	public skyblock!: SkyBlockManager;

	private logger = new Logger(this.options?.debug === true ? 'debug' : this.options?.debug === 'trace' ? 'trace' : null);

	public constructor(options?: ClientOptions) {
		this.options = options ?? {};
		this.options.baseApiUrl = 'https://api.hypixel.net/v2';
	}

	/**
	 * Starts the hypixel client (registers all managers)
	 * *NOTE*: This method must be called before further usage.
	 */
	public start() {
		this.registerManagers();
		this.logger.debug('Client managers registered');
		return this;
	}

	/**
	 * Register all the managers
	 */
	private registerManagers() {
		this.requests = new RequestManager(this, this.logger);
		this.players = new PlayerManager(this, this.logger);
		this.guilds = new GuildManager(this, this.logger);
		this.resources = new ResourceManager(this, this.logger);
		this.others = new OtherManager(this, this.logger);
		this.skyblock = new SkyBlockManager(this, this.logger);
	}
}
