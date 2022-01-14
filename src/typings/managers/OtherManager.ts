export interface GetActiveBoostersResponse {
	boosters: ActiveBooster[] | QueuedBooster[];
	boosterState: {
		decrementing: boolean;
	};
}

export interface ActiveBooster {
	_id: string;
	purchaserUuid: string;
	amount: number;
	originalLength: number;
	length: number;
	gameType: number;
	dateActivated: number;
	stacked: string[] | null;
}

export interface QueuedBooster extends Omit<ActiveBooster, 'stacked'> {
	stacked: boolean | null;
}

export interface GetPlayerCountResponse {
	playerCount: number;
	games: Record<string, any>;
}

export interface GetPunishmentStatisticsResponse {
	watchdog_lastMinute: number;
	staff_rollingDaily: number;
	watchdog_total: number;
	watchdog_rollingDaily: number;
	staff_total: number;
}
