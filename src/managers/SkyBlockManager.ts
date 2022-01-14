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

export class SkyBlockManager extends BaseManager {
	public constructor(client: Client) {
		super(client);
	}

	public async collections(): Promise<CollectionInformationResponse> {
		const { lastUpdated, version, collections } = await this.client.api.resources.skyblock.collections.get();
		return { lastUpdated, version, collections };
	}

	public async skills(): Promise<SkillsInformationResponse> {
		const { lastUpdated, version, skills } = await this.client.api.resources.skyblock.skills.get();
		return { lastUpdated, version, skills };
	}

	public async items(): Promise<ItemsInformationResponse> {
		const { lastUpdated, items } = await this.client.api.resources.skyblock.items.get();
		return { lastUpdated, items };
	}

	public async getNews(): Promise<GetNewsResponseItem[]> {
		const { items } = await this.client.api.skyblock.news.get();
		return items;
	}

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

	public async getActiveAuctions(pageNumber = 0): Promise<GetActiveAuctionsResponse> {
		const query = new RequestData({ query: { page: pageNumber } });
		const { page, totalPages, totalAuctions, lastUpdated, auctions } = await this.client.api.skyblock.auctions.get(query);
		return { page, totalPages, totalAuctions, lastUpdated, auctions };
	}

	public async recentlyEndedAuctions(): Promise<RecentlyEndedAuctionsResponse> {
		const { lastUpdated, auctions } = await this.client.api.skyblock['auctions_ended'].get();
		return { lastUpdated, auctions };
	}

	public async bazaar(): Promise<BaazarResponse> {
		const { lastUpdated, products } = await this.client.api.skyblock.bazaar.get();
		return { lastUpdated, products };
	}

	public async getProfile(nameOrUUID: string): Promise<SkyBlockProfile | null> {
		const isUUID = this.client.util.isUUID(nameOrUUID);
		const uuid = isUUID ? nameOrUUID : await this.client.util.getUUID(nameOrUUID);

		const requestData = new RequestData({ query: { profile: uuid } });
		const { profile } = await this.client.api.skyblock.profile.get(requestData);
		return new SkyBlockProfile(this.client, profile);
	}
}
