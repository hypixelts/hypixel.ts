export interface CollectionInformationResponse {
	lastUpdated: number;
	version: string;
	collections: Record<any, any>;
}

export interface SkillsInformationResponse {
	lastUpdated: number;
	version: string;
	skills: Record<any, any>;
}

export interface ItemsInformationResponse {
	lastUpdated: number;
	items: SkyBlockItem[];
}

export interface SkyBlockItem {
	id: string;
	material: string;
	name: string;
	tier: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC' | 'SUPREME' | 'SPECIAL' | 'VERY_SPECIAL';
	color: string;
	skin: string;
}

export interface GetNewsResponseItem {
	item: { material: string };
	link: string;
	text: string;
	title: string;
}

export type GetAuctionType = 'uuid' | 'player' | 'profile';

export interface GetActiveAuctionsResponse {
	page: number;
	totalPages: number;
	totalAuctions: number;
	lastUpdated: number;
	auctions: SkyBlockAuction[];
}

export interface SkyBlockAuction {
	_id: string;
	uuid: string;
	auctioneer: string;
	profile_id: string;
	coop: string[];
	start: number;
	end: string;
	item_name: string;
	item_lore: string;
	extra: string;
	category: string;
	tier: string;
	starting_bid: number;
	item_bytes: { type: number; data: string };
	claimed: boolean;
	claimed_bidders: any;
	highest_bid_amount: number;
	bids: SkyBlockAuctionBid[];
}

export interface SkyBlockAuctionBid {
	auction_id: string;
	bidder: string;
	profile_id: string;
	amount: number;
	timestamp: number;
}

export interface RecentlyEndedAuctionsResponse {
	lastUpdated: number;
	auctions: RecentlyEndedAuctionResponseAuction[];
}

export interface RecentlyEndedAuctionResponseAuction {
	auction_id: string;
	seller: string;
	seller_profile: string;
	buyer: string;
	timestamp: number;
	price: number;
	bin: boolean;
	item_bytes: string;
}

export interface BaazarResponse {
	lastUpdated: number;
	products: {
		[T: string]: {
			product_id: string;
			sell_summary: {
				amount: number;
				pricePerUnit: number;
				orders: number;
			}[];
			buy_summary: {
				amount: number;
				pricePerUnit: number;
				orders: number;
			}[];
			quick_status: {
				productId: string;
				sellPrice: number;
				sellVolume: number;
				sellMovingWeek: number;
				sellOrders: number;
				buyPrice: number;
				buyVolume: number;
				buyMovingWeek: number;
				buyOrders: number;
			};
		};
	};
}
