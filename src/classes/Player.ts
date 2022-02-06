import { BaseClass } from '.';
import type { Client } from '../lib';
import type { APIPlayer } from '../typings';

/**
 * Represents a Player class.
 * @extends {BaseClass}
 */
export class Player extends BaseClass {
	public _id?: string;
	public uuid!: string;
	public displayname!: string;
	public rank?: string;
	public packageRank?: string;
	public firstLogin!: string;
	public knownAliases?: string[];
	public knownAliasesLower?: string[];
	public lastLogin!: number;
	public playername?: string;
	public achievementsOneTime?: string[];
	public lastLogout!: number;
	public stats!: Record<string, any>;
	public achievementPoints?: number;
	public achievements?: Record<string, any>;
	public karma?: number;
	public networkExp?: number;
	public parkourCheckpointBests?: Record<string, any>;
	public parkourCompletions?: Record<string, any>;
	public channel?: string;
	public challenges?: Record<string, any>;
	public newPackageRank!: string;
	public levelUp_VIP?: number;
	public achievementRewardsNew?: Record<string, any>;
	public quests?: Record<string, any>;
	public levelUp_MVP_PLUS?: number;
	public currentGadget?: string;
	public questSettings?: Record<string, any>;
	public particlePack?: string;
	public vanityMeta?: Record<string, any>;
	public monthlycrates?: Record<string, any>;
	public eugene?: Record<string, any>;
	public petConsumables?: Record<string, any>;
	public tourney?: Record<string, any>;
	public rankPlusColor?: string;
	public housingMeta?: Record<string, any>;
	public monthlyPackageRank!: string;
	public mostRecentMonthlyPackageRank?: string;
	public socialMedia?: Record<string, any>;
	public achievementSync?: Record<string, any>;
	public lastAdsenseGenerateTime?: number;
	public lastClaimedReward?: number;
	public rewardHighScore?: number;
	public rewardScore?: number;
	public rewardStreak?: number;
	public totalDailyRewards?: number;
	public totalRewards?: number;
	public currentClickEffect?: string;
	public disabledProjectileTrails?: boolean;
	public seasonal?: Record<string, any>;
	public adsense_tokens?: number;
	public monthlyRankColor?: string;
	public currentPet?: string;
	public petStats?: Record<string, any>;
	public petJourneyTimestamp?: number;
	public giftingMeta?: Record<string, any>;
	public achievementTotem?: Record<string, any>;
	public mostRecentGameType?: string;

	public constructor(client: Client, data: APIPlayer) {
		super(client);
		Object.assign(this, data);
	}

	/**
	 * Get the friends of this player.
	 * @param {boolean} [raw]: Whether to return the raw API data. Defaults to true.
	 * @returns {Promise<import('../typings').GetPlayerFriendsRawResponse | Player[]>}
	 */
	public async getFriends(raw?: boolean) {
		return this.client.players.getFriends(this.uuid, raw);
	}

	/**
	 * Get the recently played games of this player.
	 * @returns {Promise<import('../typings').GetRecentlyPlayedGamesResponse>}
	 */
	public get recentlyPlayedGames() {
		return this.client.players.getRecentlyPlayedGames(this.uuid);
	}

	/**
	 * Get the current status of the player.
	 * @returns {Promise<import('../typings').GetStatusResponse>}
	 */
	public get status() {
		return this.client.players.getStatus(this.uuid);
	}

	/**
	 * Get the ranked skywars data of the player.
	 * @returns {Promise<import('../typings').GetRankedSkywarsDataResponse>}
	 */
	public get rankedSkywarsData() {
		return this.client.players.getRankedSkywarsData(this.uuid);
	}
}
