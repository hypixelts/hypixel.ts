import type { SkyBlockAuction } from '../../classes/SkyBlockAuction';

/**
 * The Auction object returned from the API (in JSON) which is converted to the @see {@link SkyBlockAuction} class.
 * @category Interfaces
 */
export interface APISkyBlockAuction {
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
	item_bytes: { type: number; data: string };
	claimed: boolean;
	claimed_bidders: unknown[];
	highest_bid_amount: number;
	bids: APISkyBlockAuctionBid[];
}

/**
 * @category Interfaces
 */
export interface APISkyBlockAuctionBid {
	auction_id: string;
	bidder: string;
	profile_id: string;
	amount: number;
	timestamp: number;
}
