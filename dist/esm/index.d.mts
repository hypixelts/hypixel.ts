export { HypixelAPIError, HypixelAPIErrorResponse } from './lib/rest/HypixelAPIError.mjs';

/**
 * The base manager which all other managers extend from
 * @category Managers
 * @group Managers
 */
declare class BaseManager {
    /**
     * Whether or not the manager requires API key authorization.
     */
    protected requiresAuth: boolean;
    /**
     * The instantiated hypixel.ts client
     */
    protected client: Client;
    constructor(client: Client, requiresAuth: boolean);
    /**
     * Calls the request manager to create (and execute) requests to the API.
     *
     * **NOTE**: Do not directly use this method unless you know what you are doing. Consider using the methods provided in the managers.
     * @param path The path/endpoint of the request
     * @private
     */
    protected makeGetRequest<T>(path: string): Promise<T>;
}

/**
 * The base class which all other classes extend from.
 * @category Classes
 * @group Classes
 */
declare class Base {
    /**
     * The instantiated hypixel.ts client.
     */
    protected client: Client;
    constructor(client: Client);
}

/**
 * The Guild object returned from the API (in JSON) which is converted to @see {@link Guild} class.
 * @category Interfaces
 */
interface APIGuild {
	_id: string;
	id: string;
	name: string;
	nameLower: string;
	coins: number;
	coinsEver: number;
	created: number;
	members: APIGuildMember[];
	ranks: APIGuildRank[];
	achievements: Record<string, number>;
	exp: number;
	guildExpByGameType: Record<string, number>;
}

/**
 * @category Interfaces
 */
interface APIGuildMember {
	uuid: string;
	rank: string;
	joined: number;
	questParticipation: number;
	expHistory: Record<string, number>;
}

/**
 * @category Interfaces
 */
interface APIGuildRank {
	name: string;
	priority: number;
	created: number;
	default?: boolean;
}

/**
 * The Player object returned from the API (in JSON) which is converted to the @see {@link Player} class.
 * @category Interfaces
 */
interface APIPlayer {
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

/**
 * The Auction object returned from the API (in JSON) which is converted to the @see {@link SkyBlockAuction} class.
 * @category Interfaces
 */
interface APISkyBlockAuction {
	_id: string;
	id: string;
	uuid: string;
	auctioneer: string;
	profile_id: string;
	coop: string[];
	start: number;
	end: number;
	item_name: string;
	item_lore: string;
	extra: string;
	category: string;
	tier: string;
	starting_bid: number;
	bin: boolean;
	item_bytes: { type: number; data: string };
	claimed: boolean;
	claimed_bidders: unknown[];
	highest_bid_amount: number;
	bids: APISkyBlockAuctionBid[];
}

/**
 * @category Interfaces
 */
interface APISkyBlockAuctionBid {
	auction_id: string;
	bidder: string;
	profile_id: string;
	amount: number;
	timestamp: number;
}

/**
 * The Profile object returned from the API (in JSON) which is converted to the @see {@link SkyBlockProfile} class.
 * @category Interfaces
 */
interface APISkyBlockProfile {
	profile_id: string;
	community_upgrades: Record<string, string>;

	/**
	 * A map of member UUIDs to member profiles objects
	 */
	members: APISkyBlockProfileMembers;

	/**
	 * The cute name of the profile, only provided on the profiles endpoint
	 */
	cute_name: string | null;

	/**
	 * Whether or not this is the currently selected profile, only provided on the profiles endpoint
	 */
	selected: boolean | null;

	/**
	 * Information about the bank account for this profile, only present if the API banking setting is enabled
	 */
	banking: APISkyBlockAuctionBanking;

	/**
	 * The SkyBlock game mode of the profile, not present if normal mode
	 */
	game_mode: 'ironman' | 'island' | 'bingo';
}

/**
 * @category Interfaces
 */
interface APISkyBlockProfileMembers {
	player_id: string;
	/**
	 * If this field exists, the member profile is marked as deleted
	 */
	deletion_notice: {
		timestamp: number;
	};
}

/**
 * @category Interfaces
 */
interface APISkyBlockAuctionBanking {
	balance: number;
	transactions: APISkyBlockAuctionBankingTransaction[];
}

/**
 * @category Interfaces
 */
interface APISkyBlockAuctionBankingTransaction {
	timestamp: number;
	action: 'DEPOSIT' | 'WITHDRAW';
	initiator_name: string;
	amount: number;
}

/**
 * The Museum object returned from the API (in JSON) which is converted to the @see {@link SkyBlockMuseum} class.
 * @category Interfaces
 */

interface APISkyBlockMuseum {
	[key: string]: APISkyBlockMuseumMember
}

interface APISkyBlockMuseumMember {
	value: number
	appraisal: boolean
	items: APISkyBlockMuseumItemObject
	special: APISkyBlockMuseumItem[]
}

interface APISkyBlockMuseumItemObject {
	[key: string]: APISkyBlockMuseumItem
}

/**
 * @category Interfaces
 */
interface APISkyBlockMuseumItem {
	donated_time: number
	items: APISkyBlockMuseumItemItem
}

/**
 * @category Interfaces
 */
interface APISkyBlockMuseumItemItem {
	type: number
	data: string
}

/**
 * Response returned by mojang API for user uuid lookup
 * @category Interfaces
 * @see {@link Util.getUUID}
 */
interface GetUUIDResponse {
	name: string;
	id: string;
	errorMessage?: string;
}

/**
 * Response returned by mojang API for user name lookup
 * @category Interfaces
 * @see {@link Util.getUsername}
 */
interface GetUsernameResponse {
	name: string;
	uuid: string;
	errorMessage?: string;
}

/**
 * Active network boosters returned by the hypixel API
 * @category Interfaces
 */
interface ActiveNetworkBoostersResponse {
	boosters: ActiveNetworkBoostersResponseActiveBooster;
	boosterState: { decrementing: boolean };
}

/**
 * @category Interfaces
 */
interface ActiveNetworkBoostersResponseActiveBooster {
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
interface ActiveNetworkBoostersResponseQueuedBooster extends Omit<ActiveNetworkBoostersResponseActiveBooster, 'stacked'> {
	stacked: boolean | null;
}

/**
 * Player count returned by hypixel API
 * @category Interfaces
 */
interface CurrentPlayerCountsResponse {
	playerCount: number;
	games: Record<string, { players: number; modes?: Record<string, string> }>;
}

/**
 * Current leaderboards returned by the hypixel API
 * @category Interfaces
 */
interface CurrentLeaderboardsResponse {
	leaderboards: Record<string, unknown[]>;
}

/**
 * Punishment statistics returned by the hypixel API.
 * @category Interfaces
 */
interface PunishmentStatisticsResponse {
	watchdog_lastMinute: number;
	staff_rollingDaily: number;
	watchdog_total: number;
	watchdog_rollingDaily: number;
	staff_total: number;
}

/**
 * Recently played games returned by hypixel API
 * @category Interfaces
 * @see {@link PlayerManager.getRecentlyPlayedGames}
 */
interface GetRecentlyPlayedGamesResponse {
	date: number;
	gameType: string;
	mode: string;
	map: string;
	ended: number;
}

/**
 * Status of a player returned by hypixel API
 * @category Interfaces
 * @see {@link PlayerManager.getStatus}
 */
interface GetStatusResponse {
	online: boolean;
	gameType: string;
	mode: string;
	map: string;
}

/**
 * All other responses extend this interface as they have the common property 'lastUpdated'.
 * @category Interfaces
 */
interface BaseResourceResponse {
	lastUpdated: number;
}

/**
 * Information about hypixel games returned by the hypixel API
 * @category Interfaces
 * @see {@link ResourceManager.fetchGameInformation}
 */
interface GameInformationResponse extends BaseResourceResponse {
	games: Record<string, GameInformationResponse>;
}

/**
 * @category Interfaces
 */
interface GameInformationResponseGame {
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
interface AchievementsResponse extends BaseResourceResponse {
	achievements: Record<string, AchievementsResponseAchievement>;
}

/**
 * @category Interfaces
 */
interface AchievementsResponseAchievement {
	one_time: Record<string, AchievementsResponseAchievementOnetime>;
	tiered: Record<string, AchievementsResponseAchievementTiered>;
	total_points: number;
	total_legacy_points: number;
}

/**
 * @category Interfaces
 */
interface AchievementsResponseAchievementOnetime {
	points: number;
	name: string;
	description: string;
	gamePercentUnlocked: number;
	globalPercentUnlocked: number;
}

/**
 * @category Interfaces
 */
interface AchievementsResponseAchievementTiered {
	name: string;
	description: string;
	tiers: { tier: number; points: number; amount: number }[];
}

/**
 * All challenges returned by hypixel API
 * @category Interfaces
 */
interface ChallengesResponse extends BaseResourceResponse {
	challenges: Record<string, ChallengesResponseChallenge[]>;
}

/**
 * @category Interfaces
 */
interface ChallengesResponseChallenge {
	id: string;
	name: string;
	rewards: { type: string; amount: number }[];
}

/**
 * All quests returned by the hypixel API
 * @category Interfaces
 */
interface QuestsResponse extends BaseResourceResponse {
	quests: Record<string, QuestsResponseQuest[]>;
}

/**
 * @category Interfaces
 */
interface QuestsResponseQuest {
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
interface GuildAchievementsResponse extends BaseResourceResponse {
	one_time: AchievementsResponseAchievementOnetime;
	tiered: AchievementsResponseAchievementTiered;
}

/**
 * All vanity pets returned by the hypixel API
 * @category Interfaces
 */
interface VanityPetsResponse extends BaseResourceResponse {
	types: VanityPetsResponseType[];
	rarities: VanityPetsResponseRarity[];
}

/**
 * @category Interfaces
 */
interface VanityPetsResponseType {
	key: string;
	name: string;
	rarity: VanityPetsRarity;
	package: string;
}

/**
 * @category Interfaces
 */
interface VanityPetsResponseRarity {
	name: VanityPetsRarity;
	color: string;
}

/**
 * @category Enumerations
 */
declare enum VanityPetsRarity {
	COMMON,
	RARE,
	EPIC,
	LEGENDARY
}

/**
 * All vanity companions returned by the hypixel API
 * @category Interfaces
 */
interface VanityCompanionsResponse extends VanityPetsResponse {}

/**
 * Information regarding collections returned by the hypixel API.
 * @category Interfaces
 */
interface FetchCollectionsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
}

/**
 * @category Interfaces
 */
interface FetchCollectionsResponseCollection {
	name: string;
	items: Record<string, unknown>;
}

/**
 * Information regarding skills returned by the hypixel API.
 * @category Interfaces
 */
interface FetchSkillsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
	skills: Record<string, FetchSkillsResponseSkill>;
}

/**
 * @category Interfaces
 */
interface FetchSkillsResponseCollection {
	name: string;
	description: string;
	maxLevel: number;
	levels: Array<Record<string, unknown>>;
}

/**
 * @category Interfaces
 */
interface FetchSkillsResponseSkill extends FetchCollectionsResponseCollection {}

/**
 * Information regarding items in the SkyBlock game
 * @category Interfaces
 */
interface FetchItemsResponse extends BaseResourceResponse {
	items: Array<Record<string, FetchItemsResponseItem | string>>;
}

/**
 * @category Interfaces
 */
interface FetchItemsResponseItem {
	id: string;
	name: string;
	tier: string;
	unstackable: boolean;
}

/**
 * Information regarding the current mayor and ongoing election in SkyBlock
 * @category Interfaces
 */
interface FetchElectionAndMayorResponse extends BaseResourceResponse {
	mayor: FetchElectionAndMayorResponseMayor;
	current?: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
interface FetchElectionAndMayorResponseMayor {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	election: FetchElectionAndMayorResponseElection;
	current?: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
interface FetchElectionAndMayorResponseMayorPerks {
	name: string;
	description: string;
}

/**
 * @category Interfaces
 */
interface FetchElectionAndMayorResponseElection {
	year: number;
	candidates: FetchElectionAndMayorResponseElectionCandidate[];
}

/**
 * @category Interfaces
 */
interface FetchElectionAndMayorResponseCurrent extends FetchElectionAndMayorResponseElection {}

/**
 * @category Interfaces
 */
interface FetchElectionAndMayorResponseElectionCandidate {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	votes: number;
}

/**
 * Information regarding the current bingo event and its goals
 * @category Interfaces
 */
interface FetchActiveBingoGoalsResponse extends BaseResourceResponse {
	id: number;
	goals: FetchActiveBingoGoalsResponseGoal[];
}

/**
 * @category Interfaces
 */
interface FetchActiveBingoGoalsResponseGoal {
	id: string;
	name: string;
	tiers?: number[];
	progress?: number;
	lore?: string;
	requiredAmount?: number;
}

/**
 * News returned by hypixel API
 * @category Interfaces
 */
interface FetchNewsResponse extends BaseResourceResponse {
	items: FetchNewsResponseItem[];
}

/**
 * @category Interfaces
 */
interface FetchNewsResponseItem {
	item: {
		material: string;
	};
	link: string;
	text: string;
	title: string;
}

/**
 * Active auctions returned by the hypixel API
 * @category Interfaces
 */
interface FetchActiveAuctionsResponse {
	lastUpdated: number;
	page: number;
	totalPages: number;
	totalAuctions: number;
	auctions: APISkyBlockAuction[];
}

/**
 * Recently ended auctions returned by the hypixel API
 * @category Interfaces
 */
interface RecentlyEndedAuctionsResponse {
	lastUpdated: number;
	auctions: RecentlyEndedAuctionsResponseAuction[];
}

/**
 * @category Interfaces
 */
interface RecentlyEndedAuctionsResponseAuction {
	auction_id: string;
	seller: string;
	seller_profile: string;
	buyer: string;
	timestamp: number;
	price: number;
	bin: boolean;
	item_bytes: string;
}

/**
 * Bazaar items returned by the hypixel API
 * @category Interfaces
 */
interface FetchBazaarResponse {
	lastUpdated: number;
	products: Record<string, FetchBazaarResponseProduct>;
}

/**
 * @category Interfaces
 */
interface FetchBazaarResponseProduct {
	product_id: string;
	sell_summary: FetchBazaarResponseProductSellSummary[];
	buy_summary: FetchBazaarResponseProductBuySummary;
	quick_status: FetchBazaarResponseProductQuickStatus;
}

/**
 * @category Interfaces
 */
interface FetchBazaarResponseProductSellSummary {
	amount: number;
	pricePerUnit: number;
	orders: number;
}

/**
 * @category Interfaces
 */
interface FetchBazaarResponseProductBuySummary extends FetchBazaarResponseProductSellSummary {}

/**
 * @category Interfaces
 */
interface FetchBazaarResponseProductQuickStatus {
	productId: string;
	sellPrice: number;
	sellVolume: number;
	sellMovingWeek: number;
	sellOrders: number;
	buyPrice: number;
	buyVolume: number;
	buyMovingWeek: number;
	buyOrders: number;
}

/**
 * Bingo data of a player returned by the hypixel API
 * @category Interfaces
 */
interface FetchBingoDataResponse {
	events: FetchBingoDataResponseEvent[];
}

/**
 * @category Interfaces
 */
interface FetchBingoDataResponseEvent {
	key: number;
	points: number;
	completed_goals: string[];
}

/**
 * @category Interfaces
 */
interface FetchFireSalesResponse {
	sales: FetchFireSalesResponseFireSale[];
}

/**
 * @category Interfaces
 */
interface FetchFireSalesResponseFireSale {
	/**
	 * The SkyBlock item ID for this sale
	 */
	item_id: string;
	/**
	 * The start time in unix milliseconds for the sale
	 */
	start: number;
	/**
	 * The end time in unix milliseconds for the sale
	 */
	end: number;
	/**
	 * The amount of items available for this sale
	 */
	amount: number;
	/**
	 * The price in Gems for this sale
	 */
	price: number;
}

/**
 * The guild class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/Player-Data/paths/~1guild/get}
 */
declare class Guild extends Base {
    /**
     * @param client Instantiated (and started) hypixel.ts client
     * @param data Guild data received from API
     */
    constructor(client: Client, data: APIGuild);
}

/**
 * Guild related endpoints
 * @category Managers
 * @group Managers
 */
declare class GuildManager extends BaseManager {
    constructor(client: Client);
    /**
     * Fetch a guild by the guild id, or its name, or a player's guild by providing their uuid
     * @param identifier The id/name of the guild or the uuid of the player
     * @param type The type of identifier you're passing (id/name of guild, player uuid)
     */
    fetch(identifier: string, type: 'id' | 'name' | 'player'): Promise<Guild | null>;
}

/**
 * Other endpoints
 * @category Managers
 * @group Managers
 * @see {@link https://api.hypixel.net/#tag/Other}
 */
declare class OtherManager extends BaseManager {
    constructor(client: Client);
    /**
     * Fetch all active network boosters
     */
    fetchActiveNetworkBoosters(): Promise<ActiveNetworkBoostersResponse>;
    /**
     * Fetch current player counts across all games
     */
    fetchCurrentPlayerCounts(): Promise<CurrentPlayerCountsResponse>;
    /**
     * Fetch current leaderboards
     */
    fetchCurrentLeaderboards(): Promise<CurrentLeaderboardsResponse>;
    /**
     * Fetch punishment statistics
     */
    fetchPunishmentStatistics(): Promise<PunishmentStatisticsResponse>;
}

interface SkyBlockProfile extends APISkyBlockProfile {
}
/**
 * The SkyBlockProfile class.
 * @category Classes
 * @Group Classes
 * @see {@link https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1profile/get}
 */
declare class SkyBlockProfile extends Base {
    /**
     * @param client Instantiated (and started) hypixel.ts client
     * @param data SkyBlock profile data received from API
     */
    constructor(client: Client, data: APISkyBlockProfile);
}

interface Player extends APIPlayer {
}
/**
 * The player class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/Player-Data/paths/~1player/get}
 */
declare class Player extends Base {
    /**
     * @param client Instantiated (and started) hypixel.ts client
     * @param data Player data received from API
     */
    constructor(client: Client, data: APIPlayer);
    /**
     * Fetch the SkyBlock profiles of this player
     * @see {@link SkyBlockManager.fetchPlayerSkyBlockProfiles}
     */
    fetchSkyBlockProfiles(): Promise<SkyBlockProfile[]>;
}

interface SkyBlockAuction extends APISkyBlockAuction {
}
/**
 * The sky block auction class
 * @category Classes
 * @group Classes
 * @see {@link https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1auction/get}
 */
declare class SkyBlockAuction extends Base {
    /**
     * @param client Instantiated (and started) hypixel.ts client
     * @param data SkyBlock auction data received from API
     */
    constructor(client: Client, data: APISkyBlockAuction);
}

interface SkyBlockMuseum extends APISkyBlockMuseum {
}
/**
 * The SkyBlockMuseum class.
 * @category Classes
 * @Group Classes
 */
declare class SkyBlockMuseum extends Base {
    /**
     * @param client Instantiated (and started) hypixel.ts client
     * @param data SkyBlock profile data received from API
     */
    constructor(client: Client, data: APISkyBlockMuseum);
}

/**
 * Utility functions
 * @category Classes
 * @group Classes
 */
declare class Util extends Base {
    /**
     * Get the UUID of a player by providing their name
     * @param name The name of the player
     */
    static getUUID(name: string): Promise<string>;
    /**
     * Get player's name from their UUID
     * @param uuid The uuid of the player
     */
    static getUsername(uuid: string): Promise<string>;
    /**
     * Check whether the provided UUID is a valid UUID or not
     * @param uuid The UUID to check
     */
    static isUUID(uuid: string): boolean;
}

/**
 * Player related endpoints.
 * @category Managers
 * @group Managers
 */
declare class PlayerManager extends BaseManager {
    constructor(client: Client);
    /**
     * Fetch a player using their username or uuid
     * @param identifier The username/uuid of the player
     */
    fetch(identifier: string): Promise<Player>;
    /**
     * Fetch the recently played games of a player
     * @param identifier The username/uuid of the player
     */
    getRecentlyPlayedGames(identifier: string): Promise<GetRecentlyPlayedGamesResponse[]>;
    /**
     * Fetch the status of a player
     * @param identifier The username/uuid of the player
     */
    getStatus(identifier: string): Promise<GetStatusResponse>;
    /**
     * Resolves the username to a uuid for use in requests
     * @param identifier The username (or uuid) of the player
     */
    private getUUID;
}

/**
 * Resource endpoints.
 *
 * **Note**: API Key authorization is not required to use this manager.
 *
 * @category Managers
 * @group Managers
 */
declare class ResourceManager extends BaseManager {
    constructor(client: Client);
    /**
     * Fetch information about Hypixel games
     */
    fetchGameInformation(): Promise<GameInformationResponse>;
    /**
     * Fetch all achievements
     */
    fetchAchievements(): Promise<AchievementsResponse>;
    /**
     * Fetch all challenges
     */
    fetchChallenges(): Promise<ChallengesResponse>;
    /**
     * Fetch all quests
     */
    fetchQuests(): Promise<QuestsResponse>;
    /**
     * Fetch all guild achievements
     */
    fetchGuildAchievements(): Promise<GuildAchievementsResponse>;
    /**
     * Fetch all vanity pets
     */
    fetchVanityPets(): Promise<VanityPetsResponse>;
    /**
     * Fetch all vanity companions
     */
    fetchVanityCompanions(): Promise<VanityCompanionsResponse>;
}

/**
 * Skyblock related endpoints
 * @category Managers
 * @group Managers
 * @see {@link https://api.hypixel.net/#tag/SkyBlock}
 */
declare class SkyBlockManager extends BaseManager {
    constructor(client: Client);
    /**
     * Fetch information regarding collections in the SkyBlock game
     */
    fetchCollections(): Promise<FetchCollectionsResponse>;
    /**
     * Fetch information regarding skills in the SkyBlock game
     */
    fetchSkills(): Promise<FetchSkillsResponse>;
    /**
     * Fetch information regarding items in the SkyBlock game
     */
    fetchItems(): Promise<FetchItemsResponse>;
    /**
     * Fetch information regarding the current mayor and ongoing election in SkyBlock
     */
    fetchElectionAndMayor(): Promise<FetchElectionAndMayorResponse>;
    /**
     * Fetch information regarding the current bingo event and its goals
     */
    fetchActiveBingoGoals(): Promise<FetchActiveBingoGoalsResponse>;
    /**
     * Fetch SkyBlock news
     */
    fetchNews(): Promise<{
        items: FetchNewsResponseItem[];
    }>;
    /**
     * Fetch a SkyBlock auction.
     * @param identifier The idenitifer you're using to fetch the auction
     * @param type The type of identifier you're passing (either auction `uuid`, uuid of the `player`, uuid of the `profile`)
     * @param raw Whether to return the raw response, without converting each auction to an @see{@link SkyBlockAuction} class. Defaults to `false`.
     */
    fetchAuction(identifier: string, type: 'uuid' | 'player' | 'profile', raw?: boolean): Promise<SkyBlockAuction[] | APISkyBlockAuction[]>;
    /**
     * Fetch the currently active auctions (sorted by last updated first and paginated)
     * @param page The page number
     * @param resolveAuctions Whether to resolve the auctions returned, to a @see {@link SkyBlockAuction} class. Defaults to `true`.
     */
    fetchActiveAuctions(page?: number, resolveAuctions?: boolean): Promise<{
        lastUpdated: number;
        page: number;
        totalPages: number;
        totalAuctions: number;
        auctions: APISkyBlockAuction[];
    }>;
    /**
     * Fetch recently ended auctions (auctions which ended in the last 60 seconds).
     */
    fetchRecentlyEndedAuctions(): Promise<RecentlyEndedAuctionsResponse>;
    /**
     * Fetch bazaar items
     */
    fetchBazaar(): Promise<FetchBazaarResponse>;
    /**
     * Fetch a SkyBlock profile (using a SkyBlock profile uuid). The data returned can differ depending on the players in-game API settings.
     * @param profileUuid The uuid of the SkyBlock profile
     */
    fetchProfile(profileUuid: string): Promise<SkyBlockProfile>;
    /**
     * Fetch a Skyblock profile museum (using a SkyBlock profile uuid). The data returned can differ depending on the players in-game API settings.
     * @param profileUuid The uuid of the SkyBlock profile
     */
    fetchMuseum(profileUuid: string): Promise<SkyBlockMuseum>;
    /**
     * Fetch a SkyBlock profiles of a player
     * @param playerUuid The uuid of the player
     */
    fetchPlayerSkyBlockProfiles(playerUuid: string): Promise<SkyBlockProfile[]>;
    /**
     * Fetch bingo data of a player
     * @param playerUuid The uuid of the player
     */
    fetchBingoData(playerUuid: string): Promise<FetchBingoDataResponse>;
    /**
     * Fetch the currently active or upcoming Fire Sales for SkyBlock
     */
    fetchFireSales(): Promise<FetchFireSalesResponseFireSale[]>;
}

/**
 * The options supplied to the request
 * @category Rest
 * @group Rest
 */
interface ApiRequestOptions {
    /**
     * The request path/endpoint
     */
    path: string;
    /**
     * The request method, only `GET` is supported
     */
    method?: 'GET';
    /**
     * Whether to send the API key for this request
     */
    sendAPIKey?: boolean;
}
/**
 * Handles (sending/building options) requests
 * @category Rest
 * @group Rest
 */
declare class ApiRequest {
    /**
     * The request manager instance
     */
    requests: RequestManager;
    /**
     * The options of this request
     */
    options: ApiRequestOptions;
    constructor(requestManager: RequestManager, options: ApiRequestOptions);
    /**
     * Makes a request with the options provided.
     */
    make(): Promise<Response>;
    /**
     * Creates an object containing the options to be passed to the request
     */
    buildOptions(): {
        url: string;
        method: "GET";
        headers: Record<string, string>;
    };
}

/**
 * Manages the requests to the API
 * @category Rest
 * @group Rest
 */
declare class RequestManager {
    /**
     * The hypixel.ts client instance
     */
    client: Client;
    /**
     * The base url of the hypixel API
     */
    baseApiUrl: string;
    /**
     * Queue for requests
     * @see {@link https://npmjs.com/@sapphire/async-queue}
     */
    private queue;
    constructor(client: Client);
    /**
     * Makes the api request and pushes it to the request queue
     * @param path The path/endpoint to make the request to
     * @param sendAPIKey Whether or not to send the apiKey with this request
     */
    execute<T>(path: string, sendAPIKey: boolean): Promise<T>;
}

/**
 * The hypixel.ts client.
 * @category Classes
 */
declare class Client {
    options?: ClientOptions;
    requests: RequestManager;
    players: PlayerManager;
    guilds: GuildManager;
    resources: ResourceManager;
    others: OtherManager;
    skyblock: SkyBlockManager;
    constructor(options?: ClientOptions);
    /**
     * Starts the hypixel client (registers all managers)
     * *NOTE*: This method must be called before further usage.
     */
    start(): this;
    /**
     * Register all the managers
     */
    private registerManagers;
}

/**
 * The client options.
 * @category Interfaces
 */
interface ClientOptions {
    /**
     * The hypixel api key.
     * This is optional to provide as some managers support non auth requests.
     */
    apiKey?: string;
    /**
     * The base hypixel api url
     * @private
     */
    baseApiUrl?: string;
}

export { type APIGuild, type APIGuildMember, type APIGuildRank, type APIPlayer, type APISkyBlockAuction, type APISkyBlockAuctionBanking, type APISkyBlockAuctionBankingTransaction, type APISkyBlockAuctionBid, type APISkyBlockMuseum, type APISkyBlockMuseumItem, type APISkyBlockMuseumItemItem, type APISkyBlockMuseumItemObject, type APISkyBlockMuseumMember, type APISkyBlockProfile, type APISkyBlockProfileMembers, type AchievementsResponse, type AchievementsResponseAchievement, type AchievementsResponseAchievementOnetime, type AchievementsResponseAchievementTiered, type ActiveNetworkBoostersResponse, type ActiveNetworkBoostersResponseActiveBooster, type ActiveNetworkBoostersResponseQueuedBooster, ApiRequest, type ApiRequestOptions, Base, BaseManager, type BaseResourceResponse, type ChallengesResponse, type ChallengesResponseChallenge, Client, type ClientOptions, type CurrentLeaderboardsResponse, type CurrentPlayerCountsResponse, type FetchActiveAuctionsResponse, type FetchActiveBingoGoalsResponse, type FetchActiveBingoGoalsResponseGoal, type FetchBazaarResponse, type FetchBazaarResponseProduct, type FetchBazaarResponseProductBuySummary, type FetchBazaarResponseProductQuickStatus, type FetchBazaarResponseProductSellSummary, type FetchBingoDataResponse, type FetchBingoDataResponseEvent, type FetchCollectionsResponse, type FetchCollectionsResponseCollection, type FetchElectionAndMayorResponse, type FetchElectionAndMayorResponseCurrent, type FetchElectionAndMayorResponseElection, type FetchElectionAndMayorResponseElectionCandidate, type FetchElectionAndMayorResponseMayor, type FetchElectionAndMayorResponseMayorPerks, type FetchFireSalesResponse, type FetchFireSalesResponseFireSale, type FetchItemsResponse, type FetchItemsResponseItem, type FetchNewsResponse, type FetchNewsResponseItem, type FetchSkillsResponse, type FetchSkillsResponseCollection, type FetchSkillsResponseSkill, type GameInformationResponse, type GameInformationResponseGame, type GetRecentlyPlayedGamesResponse, type GetStatusResponse, type GetUUIDResponse, type GetUsernameResponse, Guild, type GuildAchievementsResponse, GuildManager, OtherManager, Player, PlayerManager, type PunishmentStatisticsResponse, type QuestsResponse, type QuestsResponseQuest, type RecentlyEndedAuctionsResponse, type RecentlyEndedAuctionsResponseAuction, RequestManager, ResourceManager, SkyBlockAuction, SkyBlockManager, SkyBlockMuseum, SkyBlockProfile, Util, type VanityCompanionsResponse, VanityPetsRarity, type VanityPetsResponse, type VanityPetsResponseRarity, type VanityPetsResponseType };
