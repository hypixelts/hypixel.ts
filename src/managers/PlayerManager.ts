import { BaseManager } from '.';
import { Player } from '../classes';
import { RequestData, type Client } from '../lib';
import type { GetRecentlyPlayedGamesResponse, GetStatusResponse } from '../typings';

/**
 * The manager for player related API endpoints.
 * @extends {BaseManager}
 */
export class PlayerManager extends BaseManager {
	/**
	 * The client that instantiated this manager.
	 * @type {Client}
	 */
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Fetch a player by their name or UUID.
	 * @param {string} nameOrUUID: The name or the UUID of the player.
	 * @returns {Promise<Player>}
	 */
	public async fetch(nameOrUUID: string): Promise<Player> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const data = await this.client.api.player.get(requestData);
		return new Player(this.client, data.player);
	}

	/**
	 * Get the recently played games of a player.
	 * @param {string} nameOrUUID: The name or UUID of the player who's recently played games you want to get.
	 * @returns {Promise<GetRecentlyPlayedGamesResponse[]>}
	 */
	public async getRecentlyPlayedGames(nameOrUUID: string): Promise<GetRecentlyPlayedGamesResponse[]> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const { games } = await this.client.api.recentgames.get(requestData);
		return games;
	}

	/**
	 * Get the status of a player.
	 * @param {string} nameOrUUID: The name or UUID of the player who's status you want to get.
	 * @returns {Promise<GetStatusResponse>}
	 */
	public async getStatus(nameOrUUID: string): Promise<GetStatusResponse> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const { session } = await this.client.api.status.get(requestData);
		return session;
	}

	/**
	 * Get the UUID of a player by their name.
	 * @param {string} name: The name of the player.
	 * @returns {Promise<string>}
	 */
	public async getUUID(name: string) {
		return this.client.util.getUUID(name);
	}
}
