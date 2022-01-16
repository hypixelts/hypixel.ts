import { BaseManager } from './BaseManager';
import type { Client } from '../lib';
import type {
	CollectionInformationResponse,
	SkillsInformationResponse,
	ItemsInformationResponse,
	GetNewsResponseItem,
	GetActiveAuctionsResponse,
	RecentlyEndedAuctionsResponse,
	SkyBlockAuction,
	BaazarResponse,
	GetAuctionType
} from '../typings';
import { RequestData } from '../lib/util';
import { SkyBlockProfile } from '../classes';

/**
 * The manager for skyblock related endpoints.
 */
export class SkyBlockManager extends BaseManager {
	/**
	 * The client that instantiated this.
	 * @type {Client}
	 */
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Get information regarding SkyBlock collections.
	 * @returns {Promise<CollectionInformationResponse>}
	 */
	public async collections(): Promise<CollectionInformationResponse> {
		const { lastUpdated, version, collections } = await this.client.api.resources.skyblock.collections.get();
		return { lastUpdated, version, collections };
	}

	/**
	 * Get information regarding SkyBlock skills.
	 * @returns {Promise<SkillsInformationResponse>}
	 */
	public async skills(): Promise<SkillsInformationResponse> {
		const { lastUpdated, version, skills } = await this.client.api.resources.skyblock.skills.get();
		return { lastUpdated, version, skills };
	}

	/**
	 * Get information regarding SkyBlock items.
	 * @returns {Promise<ItemsInformationResponse>}
	 */
	public async items(): Promise<ItemsInformationResponse> {
		const { lastUpdated, items } = await this.client.api.resources.skyblock.items.get();
		return { lastUpdated, items };
	}

	/**
	 * Get news from SkyBlock.
	 * @returns {Promise<GetNewsResponseItem[]>}
	 */
	public async getNews(): Promise<GetNewsResponseItem[]> {
		const { items } = await this.client.api.skyblock.news.get();
		return items;
	}

	/**
	 * Request an auction, either by providing the auction uuid, the player uuid, or the profile uuid.
	 * @param {string} uuid: The uuid of the type provided.
	 * @param {GetAuctionType} type: The type of auction to request.
	 * @returns {Promise<SkyBlockAuction | []>}
	 */
	public async getAuction(uuid: string, type: GetAuctionType): Promise<SkyBlockAuction | []> {
		const query: { uuid?: string; player?: string; profile?: string } = {};

		switch (type) {
			case 'uuid':
			case 'player':
			case 'profile':
				query[type] = uuid;
		}

		const requestData = new RequestData({ query });
		const { auctions } = await this.client.api.skyblock.auction.get(requestData);
		return auctions;
	}

	/**
	 * Get the active auctions
	 * @param {number} [pageNumber = 0]: The page of the auction.
	 * @returns {Promise<GetActiveAuctionsResponse>}
	 */
	public async getActiveAuctions(pageNumber = 0): Promise<GetActiveAuctionsResponse> {
		const query = new RequestData({ query: { page: pageNumber } });
		const { page, totalPages, totalAuctions, lastUpdated, auctions } = await this.client.api.skyblock.auctions.get(query);
		return { page, totalPages, totalAuctions, lastUpdated, auctions };
	}

	/**
	 * Get the auctions which ended in the last 60 seconds.
	 * @returns {Promise<RecentlyEndedAuctionsResponse>}
	 */
	public async recentlyEndedAuctions(): Promise<RecentlyEndedAuctionsResponse> {
		const { lastUpdated, auctions } = await this.client.api.skyblock['auctions_ended'].get();
		return { lastUpdated, auctions };
	}

	/**
	 * Returns the list of products along with their sell summary, buy summary and quick status. For more info, please read the [Hypixel API Documentation](https://api.hypixel.net/#tag/SkyBlock/paths/~1skyblock~1bazaar/get).
	 * @returns {Promise<BaazarResponse>}
	 */
	public async bazaar(): Promise<BaazarResponse> {
		const { lastUpdated, products } = await this.client.api.skyblock.bazaar.get();
		return { lastUpdated, products };
	}

	/**
	 * Get the SkyBlock profile by the name or the UUID.
	 * @param {string} nameOrUUID: The name or the UUID of the profile.
	 * @returns {Promise<SkyBlockProfile | null>}
	 */
	public async getProfile(nameOrUUID: string): Promise<SkyBlockProfile | null> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.client.util.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { profile: uuid } });
		const { profile } = await this.client.api.skyblock.profile.get(requestData);
		return new SkyBlockProfile(this.client, profile);
	}
}
