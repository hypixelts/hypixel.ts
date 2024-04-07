import type { BaseResourceResponse } from '.';
import type { APISkyBlockAuction } from '..';

/**
 * Information regarding collections returned by the hypixel API.
 * @category Interfaces
 */
export interface FetchCollectionsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
}

/**
 * @category Interfaces
 */
export interface FetchCollectionsResponseCollection {
	name: string;
	items: Record<string, unknown>;
}

/**
 * Information regarding skills returned by the hypixel API.
 * @category Interfaces
 */
export interface FetchSkillsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
	skills: Record<string, FetchSkillsResponseSkill>;
}

/**
 * @category Interfaces
 */
export interface FetchSkillsResponseCollection {
	name: string;
	description: string;
	maxLevel: number;
	levels: Array<Record<string, unknown>>;
}

/**
 * @category Interfaces
 */
export interface FetchSkillsResponseSkill extends FetchCollectionsResponseCollection {}

/**
 * Information regarding items in the SkyBlock game
 * @category Interfaces
 */
export interface FetchItemsResponse extends BaseResourceResponse {
	items: Array<Record<string, FetchItemsResponseItem | string>>;
}

/**
 * @category Interfaces
 */
export interface FetchItemsResponseItem {
	id: string;
	name: string;
	tier: string;
	unstackable: boolean;
}

/**
 * Information regarding the current mayor and ongoing election in SkyBlock
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponse extends BaseResourceResponse {
	mayor: FetchElectionAndMayorResponseMayor;
	current: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseMayor {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	election: FetchElectionAndMayorResponseElection;
	current: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseMayorPerks {
	name: string;
	description: string;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseElection {
	year: number;
	candidates: FetchElectionAndMayorResponseElectionCandidate[];
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseCurrent extends FetchElectionAndMayorResponseElection {}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseElectionCandidate {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	votes: number;
}

/**
 * Information regarding the current bingo event and its goals
 * @category Interfaces
 */
export interface FetchActiveBingoGoalsResponse extends BaseResourceResponse {
	id: number;
	goals: FetchActiveBingoGoalsResponseGoal[];
}

/**
 * @category Interfaces
 */
export interface FetchActiveBingoGoalsResponseGoal {
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
export interface FetchNewsResponse extends BaseResourceResponse {
	items: FetchNewsResponseItem[];
}

/**
 * @category Interfaces
 */
export interface FetchNewsResponseItem {
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
export interface FetchActiveAuctionsResponse {
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
export interface RecentlyEndedAuctionsResponse {
	lastUpdated: number;
	auctions: RecentlyEndedAuctionsResponseAuction[];
}

/**
 * @category Interfaces
 */
export interface RecentlyEndedAuctionsResponseAuction {
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
export interface FetchBazaarResponse {
	lastUpdated: number;
	products: Record<string, FetchBazaarResponseProduct>;
}

/**
 * @category Interfaces
 */
export interface FetchBazaarResponseProduct {
	product_id: string;
	sell_summary: FetchBazaarResponseProductSellSummary[];
	buy_summary: FetchBazaarResponseProductBuySummary;
	quick_status: FetchBazaarResponseProductQuickStatus;
}

/**
 * @category Interfaces
 */
export interface FetchBazaarResponseProductSellSummary {
	amount: number;
	pricePerUnit: number;
	orders: number;
}

/**
 * @category Interfaces
 */
export interface FetchBazaarResponseProductBuySummary extends FetchBazaarResponseProductSellSummary {}

/**
 * @category Interfaces
 */
export interface FetchBazaarResponseProductQuickStatus {
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
 * Museum data for a SkyBlockProfile returned by the hypixel API
 * @category Interfaces
 */
export interface FetchMuseumDataResponse {
	profile: FetchMuseumDataResponseProfile;
}

/**
 * @category Interfaces
 */
export interface FetchMuseumDataResponseProfile {
	value: number;
	appraisal: boolean;
	items: Record<string, string>;
	special: unknown[];
}

/**
 * Bingo data of a player returned by the hypixel API
 * @category Interfaces
 */
export interface FetchBingoDataResponse {
	events: FetchBingoDataResponseEvent[];
}

/**
 * @category Interfaces
 */
export interface FetchBingoDataResponseEvent {
	key: number;
	points: number;
	completed_goals: string[];
}

/**
 * @category Interface
 */
export interface FetchFireSalesResponse {
	sales: FetchFireSalesResponseFireSale[];
}

/**
 * @category Interface
 */
export interface FetchFireSalesResponseFireSale {
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
