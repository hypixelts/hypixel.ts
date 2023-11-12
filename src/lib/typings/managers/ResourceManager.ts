/**
 * All other responses extend this interface as they have the common property 'lastUpdated'.
 */
export interface BaseResourceResponse {
	lastUpdated: number;
}

/**
 * Information about hypixel games returned by the hypixel API
 * @see {@link ResourceManager.fetchGameInformation}
 */
export interface GameInformationResponse extends BaseResourceResponse {
	games: Record<string, GameInformationResponse>;
}

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
 */
export interface AchievementsResponse extends BaseResourceResponse {
	achievements: Record<string, AchievementsResponseAchievement>;
}

export interface AchievementsResponseAchievement {
	one_time: Record<string, AchievementsResponseAchievementOnetime>;
	tiered: Record<string, AchievementsResponseAchievementTiered>;
	total_points: number;
	total_legacy_points: number;
}

export interface AchievementsResponseAchievementOnetime {
	points: number;
	name: string;
	description: string;
	gamePercentUnlocked: number;
	globalPercentUnlocked: number;
}

export interface AchievementsResponseAchievementTiered {
	name: string;
	description: string;
	tiers: { tier: number; points: number; amount: number }[];
}

/**
 * All challenges returned by hypixel API
 */
export interface ChallengesResponse extends BaseResourceResponse {
	challenges: Record<string, ChallengesResponseChallenge[]>;
}

export interface ChallengesResponseChallenge {
	id: string;
	name: string;
	rewards: { type: string; amount: number }[];
}

/**
 * All quests returned by the hypixel API
 */
export interface QuestsResponse extends BaseResourceResponse {
	quests: Record<string, QuestsResponseQuest[]>;
}

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
 */
export interface GuildAchievementsResponse extends BaseResourceResponse {
	one_time: AchievementsResponseAchievementOnetime;
	tiered: AchievementsResponseAchievementTiered;
}

/**
 * All vanity pets returned by the hypixel API
 */
export interface VanityPetsResponse extends BaseResourceResponse {
	types: VanityPetsResponseType[];
	rarities: VanityPetsResponseRarity[];
}

export interface VanityPetsResponseType {
	key: string;
	name: string;
	rarity: VanityPetsRarity;
	package: string;
}

export interface VanityPetsResponseRarity {
	name: VanityPetsRarity;
	color: string;
}

export enum VanityPetsRarity {
	COMMON,
	RARE,
	EPIC,
	LEGENDARY
}

/**
 * All vanity companions returned by the hypixel API
 */
export interface VanityCompanionsResponse extends VanityPetsResponse {}
