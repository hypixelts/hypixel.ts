import { HypixelTSError } from './errors';
import { PlayerManager } from './managers';
import { RequestManager } from './rest';

/**
 * The client options.
 */
export interface ClientOptions {
	/**
	 * The hypixel api key.
	 */
	apiKey: string;

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
	public options: ClientOptions;
	public requests!: RequestManager;
	public players!: PlayerManager;

	public constructor(options: ClientOptions) {
		this.options = options;
		if (!this.options) throw new HypixelTSError('CLIENT_OPTIONS_MISSING');
		this.options.baseApiUrl = 'https://api.hypixel.net';
	}

	/**
	 * Starts the hypixel client (registers all managers)
	 * *NOTE*: This method must be called before further usage.
	 */
	public start() {
		if (!this.options.apiKey) throw new HypixelTSError('CLIENT_OPTIONS_MISSING', 'apiKey');
		if (typeof this.options.apiKey !== 'string')
			throw new HypixelTSError('CLIENT_OPTION_INVALID_TYPE', 'apiKey', 'string', typeof this.options.apiKey);
		this.registerManagers();
		return this;
	}

	/**
	 * Register all the managers
	 */
	private registerManagers() {
		this.requests = new RequestManager(this);
		this.players = new PlayerManager(this);
	}
}
