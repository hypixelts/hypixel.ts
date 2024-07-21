import type { SkyBlockProfile } from '../../classes/SkyBlockProfile';

/**
 * The Profile object returned from the API (in JSON) which is converted to the @see {@link SkyBlockProfile} class.
 * @category Interfaces
 */
export interface APISkyBlockProfile {
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
export interface APISkyBlockProfileMembers {
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
export interface APISkyBlockAuctionBanking {
	balance: number;
	transactions: APISkyBlockAuctionBankingTransaction[];
}

/**
 * @category Interfaces
 */
export interface APISkyBlockAuctionBankingTransaction {
	timestamp: number;
	action: 'DEPOSIT' | 'WITHDRAW';
	initiator_name: string;
	amount: number;
}
