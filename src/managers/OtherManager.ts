import { BaseManager } from '.';
import type { Client } from '../lib';
import type { GetActiveBoostersResponse, GetAPIKeyInformationResponse, GetPlayerCountResponse, GetPunishmentStatisticsResponse } from '../typings';

/**
 * The manager for other API endpoints.
 * @extends {BaseManager}
 */
export class OtherManager extends BaseManager {
	/**
	 * The client that instantiated this manager.
	 * @type {Client}
	 */
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Get the active network boosters.
	 * @returns {Promise<GetActiveBoostersResponse>}
	 */
	public async getActiveBoosters(): Promise<GetActiveBoostersResponse> {
		const { boosters, boosterState } = await this.client.api.boosters.get();
		return { boosters, boosterState };
	}

	/**
	 * Get the current player counts.
	 * @returns {Promise<GetPlayerCountResponse>}
	 */
	public async getPlayerCount(): Promise<GetPlayerCountResponse> {
		const { playerCount, games } = await this.client.api.counts.get();
		return { playerCount, games };
	}

	/**
	 * Get the current leaderboards.
	 * @returns {Promise<Record<any, any>>}
	 */
	public async getLeaderboard(): Promise<Record<any, any>> {
		const { leaderboards } = await this.client.api.leaderboards.get();
		return leaderboards;
	}

	/**
	 * Get the punishment statistics.
	 * @returns {Promise<GetPunishmentStatisticsResponse>}}
	 */
	public async getPunishmentStatistics(): Promise<GetPunishmentStatisticsResponse> {
		const { watchdog_lastMinute, staff_rollingDaily, watchdog_total, watchdog_rollingDaily, staff_total } =
			await this.client.api.punishmentstats.get();
		return { watchdog_lastMinute, staff_rollingDaily, watchdog_total, watchdog_rollingDaily, staff_total };
	}

	/**
	 * Get API Key Information
	 * @returns {Promise<GetAPIKeyInformationResponse>}
	 */
	public async getAPIKeyInformation(): Promise<GetAPIKeyInformationResponse> {
		return (await this.client.api.key.get()).record as GetAPIKeyInformationResponse;
	}
}
