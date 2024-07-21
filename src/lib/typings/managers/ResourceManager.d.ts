import type { ResourceManager } from '../../managers/ResourceManager';

/**
 * All other responses extend this interface as they have the common property 'lastUpdated'.
 * @category Interfaces
 */
export interface BaseResourceResponse {
	lastUpdated: number;
}

/**
 * Information about hypixel games returned by the hypixel API
 * @category Interfaces
 * @see {@link ResourceManager.fetchGameInformation}
 */
export interface GameInformationResponse extends BaseResourceResponse {
	games: Record<string, GameInformationResponse>;
}

/**
 * @category Interfaces
 */
export interface GameInformationResponseGame {
	id: number;
	name: string;
	databaseName: string;
	modeNames: Record<string, string>;
	legacy?: boolean;
	retired?: boolean;
}

/**
 * All achievements returned by the hypixel API.
 * @category Interfaces
 */
export interface AchievementsResponse extends BaseResourceResponse {
	achievements: Record<string, AchievementsResponseAchievement>;
}

/**
 * @category Interfaces
 */
export interface AchievementsResponseAchievement {
	one_time: Record<string, AchievementsResponseAchievementOnetime>;
	tiered: Record<string, AchievementsResponseAchievementTiered>;
	total_points: number;
	total_legacy_points: number;
}

/**
 * @category Interfaces
 */
export interface AchievementsResponseAchievementOnetime {
	points: number;
	name: string;
	description: string;
	gamePercentUnlocked: number;
	globalPercentUnlocked: number;
}

/**
 * @category Interfaces
 */
export interface AchievementsResponseAchievementTiered {
	name: string;
	description: string;
	tiers: { tier: number; points: number; amount: number }[];
}

/**
 * All challenges returned by hypixel API
 * @category Interfaces
 */
export interface ChallengesResponse extends BaseResourceResponse {
	challenges: Record<string, ChallengesResponseChallenge[]>;
}

/**
 * @category Interfaces
 */
export interface ChallengesResponseChallenge {
	id: string;
	name: string;
	rewards: { type: string; amount: number }[];
}

/**
 * All quests returned by the hypixel API
 * @category Interfaces
 */
export interface QuestsResponse extends BaseResourceResponse {
	quests: Record<string, QuestsResponseQuest[]>;
}

/**
 * @category Interfaces
 */
export interface QuestsResponseQuest {
	id: string;
	name: string;
	description: string;
	rewards: { type: string; amount: number }[];
	objectives: { id: string; type: string }[];
	requirements: { type: string }[];
}

/**
 * All guild achievements returned by the hypixel API
 * @category Interfaces
 */
export interface GuildAchievementsResponse extends BaseResourceResponse {
	one_time: AchievementsResponseAchievementOnetime;
	tiered: AchievementsResponseAchievementTiered;
}

/**
 * All vanity pets returned by the hypixel API
 * @category Interfaces
 */
export interface VanityPetsResponse extends BaseResourceResponse {
	types: VanityPetsResponseType[];
	rarities: VanityPetsResponseRarity[];
}

/**
 * @category Interfaces
 */
export interface VanityPetsResponseType {
	key: string;
	name: string;
	rarity: VanityPetsRarity;
	package: string;
}

/**
 * @category Interfaces
 */
export interface VanityPetsResponseRarity {
	name: VanityPetsRarity;
	color: string;
}

/**
 * @category Enumerations
 */
export enum VanityPetsRarity {
	COMMON,
	RARE,
	EPIC,
	LEGENDARY
}

/**
 * All vanity companions returned by the hypixel API
 * @category Interfaces
 */
export interface VanityCompanionsResponse extends VanityPetsResponse {}
