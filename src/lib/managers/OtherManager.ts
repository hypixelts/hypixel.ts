import { BaseManager } from './BaseManager';
import { Client } from '../Client';
import type {
	ActiveNetworkBoostersResponse,
	CurrentPlayerCountsResponse,
	CurrentLeaderboardsResponse,
	PunishmentStatisticsResponse
} from '../typings';
import type { Logger } from '../Logger';

/**
 * Other endpoints
 * @category Managers
 * @group Managers
 * @see {@link https://api.hypixel.net/#tag/Other}
 */
export class OtherManager extends BaseManager {
	public constructor(client: Client, logger: Logger) {
		super(client, true, logger);
	}

	/**
	 * Fetch all active network boosters
	 */
	public async fetchActiveNetworkBoosters(): Promise<ActiveNetworkBoostersResponse> {
		const data = await this.makeGetRequest<ActiveNetworkBoostersResponse>('/boosters');
		return {
			boosters: data.boosters,
			boosterState: data.boosterState
		};
	}

	/**
	 * Fetch current player counts across all games
	 */
	public async fetchCurrentPlayerCounts(): Promise<CurrentPlayerCountsResponse> {
		const data = await this.makeGetRequest<CurrentPlayerCountsResponse>('/counts');
		return {
			playerCount: data.playerCount,
			games: data.games
		};
	}

	/**
	 * Fetch current leaderboards
	 */
	public async fetchCurrentLeaderboards(): Promise<CurrentLeaderboardsResponse> {
		const data = await this.makeGetRequest<CurrentLeaderboardsResponse>('/leaderboards');
		return {
			leaderboards: data.leaderboards
		};
	}

	/**
	 * Fetch punishment statistics
	 */
	public async fetchPunishmentStatistics(): Promise<PunishmentStatisticsResponse> {
		const data = await this.makeGetRequest<PunishmentStatisticsResponse>('/punishmentstats');
		return {
			watchdog_lastMinute: data.watchdog_lastMinute,
			staff_rollingDaily: data.staff_rollingDaily,
			watchdog_total: data.watchdog_total,
			watchdog_rollingDaily: data.watchdog_rollingDaily,
			staff_total: data.staff_total
		};
	}
}
