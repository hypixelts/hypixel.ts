import { PlayerManager, GuildManager } from './managers';
import { RequestManager } from './rest';

/**
 * The client options.
 */
export interface ClientOptions {
	/**
	 * The hypixel api key.
	 * This is optional to provide as some managers support non auth requests.
	 */
	apiKey?: string;

	/**
	 * The base hypixel api url
	 * @private
	 */
	baseApiUrl?: string;
}

/**
 * The hypixel.ts client.
 * @category Classes
 */
export class Client {
	public options?: ClientOptions;
	public requests!: RequestManager;
	public players!: PlayerManager;
	public guilds!: GuildManager;

	public constructor(options?: ClientOptions) {
		this.options = options ?? {};
		this.options.baseApiUrl = 'https://api.hypixel.net';
	}

	/**
	 * Starts the hypixel client (registers all managers)
	 * *NOTE*: This method must be called before further usage.
	 */
	public start() {
		this.registerManagers();
		return this;
	}

	/**
	 * Register all the managers
	 */
	private registerManagers() {
		this.requests = new RequestManager(this);
		this.players = new PlayerManager(this);
		this.guilds = new GuildManager(this);
	}
}
