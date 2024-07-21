import type { Player } from '../../classes/Player';

/**
 * The Player object returned from the API (in JSON) which is converted to the @see {@link Player} class.
 * @category Interfaces
 */
export interface APIPlayer {
	/**
	 * The uuid of the player.
	 */
	uuid: string;

	/**
	 * The display name of the player.
	 */
	displayName: string | null;

	/**
	 * The rank of the player
	 */
	rank: 'ADMIN' | 'MODERATOR' | 'HELPER' | 'NORMAL' | null;

	/**
	 * The package rank of the player
	 */
	packageRank: 'MVP_PLUS' | 'MVP' | 'VIP_PLUS' | 'VIP' | 'NONE' | null;

	/**
	 * The monthly package rank of the player
	 */
	monthlyPackageRank: 'SUPERSTAR' | 'NONE' | null;

	/**
	 * First login time of player (in milliseconds)
	 */
	firstLogin: number | null;

	/**
	 * Last login time of player (in milliseconds)
	 */
	lastLogin: number | null;

	/**
	 * Last logout time of player (in milliseconds)
	 */
	lastLogout: number | null;

	/**
	 * Undocumented fields (observed in API response)
	 */
	knownAliases?: string[];
	knownAliasesLower?: string[];
	playername?: string;
	achievementsOneTime?: string[];
	stats: Record<string, any>;
	achievementPoints?: number;
	achievements?: Record<string, any>;
	karma?: number;
	networkExp?: number;
	parkourCheckpointBests?: Record<string, any>;
	parkourCompletions?: Record<string, any>;
	channel?: string;
	challenges?: Record<string, any>;
	newPackageRank: string;
	levelUp_VIP?: number;
	achievementRewardsNew?: Record<string, any>;
	quests?: Record<string, any>;
	levelUp_MVP_PLUS?: number;
	currentGadget?: string;
	questSettings?: Record<string, any>;
	particlePack?: string;
	vanityMeta?: Record<string, any>;
	monthlycrates?: Record<string, any>;
	eugene?: Record<string, any>;
	petConsumables?: Record<string, any>;
	tourney?: Record<string, any>;
	rankPlusColor?: string;
	housingMeta?: Record<string, any>;
	mostRecentMonthlyPackageRank?: string;
	socialMedia?: Record<string, any>;
	achievementSync?: Record<string, any>;
	lastAdsenseGenerateTime?: number;
	lastClaimedReward?: number;
	rewardHighScore?: number;
	rewardScore?: number;
	rewardStreak?: number;
	totalDailyRewards?: number;
	totalRewards?: number;
	currentClickEffect?: string;
	disabledProjectileTrails?: boolean;
	seasonal?: Record<string, any>;
	adsense_tokens?: number;
	monthlyRankColor?: string;
	currentPet?: string;
	petStats?: Record<string, any>;
	petJourneyTimestamp?: number;
	giftingMeta?: Record<string, any>;
	achievementTotem?: Record<string, any>;
	mostRecentGameType?: string;
}
