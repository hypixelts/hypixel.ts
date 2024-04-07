/**
 * Active network boosters returned by the hypixel API
 */
export interface ActiveNetworkBoostersResponse {
	boosters: ActiveNetworkBoostersResponseActiveBooster;
	boosterState: { decrementing: boolean };
}

/**
 * @category Interfaces
 */
export interface ActiveNetworkBoostersResponseActiveBooster {
	_id: string;
	purchaserUuid: string;
	amount: number;
	originalLength: number;
	length: number;
	gameType: number;
	dateActivated: number;
	stacked: string[] | null;
}

/**
 * @category Interfaces
 */
export interface ActiveNetworkBoostersResponseQueuedBooster extends Omit<ActiveNetworkBoostersResponseActiveBooster, 'stacked'> {
	stacked: boolean | null;
}

/**
 * Player count returned by hypixel API
 * @category Interfaces
 */
export interface CurrentPlayerCountsResponse {
	playerCount: number;
	games: Record<string, { players: number; modes?: Record<string, string> }>;
}

/**
 * Current leaderboards returned by the hypixel API
 * @category Interfaces
 */
export interface CurrentLeaderboardsResponse {
	leaderboards: Record<string, unknown[]>;
}

/**
 * Punishment statistics returned by the hypixel API.
 * @category Interfaces
 */
export interface PunishmentStatisticsResponse {
	watchdog_lastMinute: number;
	staff_rollingDaily: number;
	watchdog_total: number;
	watchdog_rollingDaily: number;
	staff_total: number;
}
