import { BaseManager } from './BaseManager';
import type { Client } from '../lib';
import type { GetActiveBoostersResponse, GetPlayerCountResponse, GetPunishmentStatisticsResponse } from '../typings';

export class OtherManager extends BaseManager {
	public constructor(client: Client) {
		super(client);
	}

	public async getActiveBoosters(): Promise<GetActiveBoostersResponse> {
		const { boosters, boosterState } = await this.client.api.boosters.get();
		return { boosters, boosterState };
	}

	public async getPlayerCount(): Promise<GetPlayerCountResponse> {
		const { playerCount, games } = await this.client.api.counts.get();
		return { playerCount, games };
	}

	public async getLeaderboard(): Promise<Record<any, any>> {
		const { leaderboards } = await this.client.api.leaderboards.get();
		return leaderboards;
	}

	public async getPunishmentStatistics(): Promise<GetPunishmentStatisticsResponse> {
		const { watchdog_lastMinute, staff_rollingDaily, watchdog_total, watchdog_rollingDaily, staff_total } =
			await this.client.api.punishmentstats.get();
		return { watchdog_lastMinute, staff_rollingDaily, watchdog_total, watchdog_rollingDaily, staff_total };
	}
}
