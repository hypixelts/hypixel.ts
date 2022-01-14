import { BaseManager } from './BaseManager';
import { Player } from '../classes';
import { RequestData } from '../lib/util';
import type { Client } from '../lib';
import type { GetPlayerFriendsRawResponse, GetRecentlyPlayedGamesResponse, GetStatusResponse, GetRankedSkywarsDataResponse } from '../typings';

export class PlayerManager extends BaseManager {
	public constructor(client: Client) {
		super(client);
	}

	public async fetch(nameOrUUID: string): Promise<Player> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const data = await this.client.api.player.get(requestData);
		return new Player(this.client, data.player);
	}

	public async getFriends(nameOrUUID: string, raw?: boolean): Promise<GetPlayerFriendsRawResponse | Player[]> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const friends = await this.client.api.friends.get(requestData);

		if (raw !== undefined && !raw) {
			const array = [];

			for (const friend of friends.records) {
				const player = await this.fetch(friend.uuidReceiver);
				array.push(player);
			}
			return array;
		}

		return friends?.records ?? [];
	}

	public async getRecentlyPlayedGames(nameOrUUID: string): Promise<GetRecentlyPlayedGamesResponse[]> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const { games } = await this.client.api.recentgames.get(requestData);
		return games;
	}

	public async getStatus(nameOrUUID: string): Promise<GetStatusResponse> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const { session } = await this.client.api.status.get(requestData);
		return session;
	}

	public async getRankedSkywarsData(nameOrUUID: string): Promise<GetRankedSkywarsDataResponse> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { uuid } });
		const { result } = await this.client.api.player.ranked.skywars.get(requestData);
		return result;
	}

	public async getUUID(name: string) {
		return this.client.util.getUUID(name);
	}
}
