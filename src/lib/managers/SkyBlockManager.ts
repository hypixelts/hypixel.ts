import { BaseManager } from '.';
import { Client, SkyBlockProfile, SkyBlockAuction } from '../';
import { HypixelTSError } from '../errors';
import type {
	APISkyBlockProfile,
	FetchCollectionsResponse,
	FetchSkillsResponse,
	FetchItemsResponse,
	FetchElectionAndMayorResponse,
	FetchActiveBingoGoalsResponse,
	FetchNewsResponse,
	APISkyBlockAuction,
	FetchActiveAuctionsResponse,
	FetchBazaarResponse,
	RecentlyEndedAuctionsResponse,
	FetchMuseumDataResponse,
	FetchBingoDataResponse,
	FetchFireSalesResponse
} from '../typings';

/**
 * Skyblock related endpoints
 * @category Managers
 * @group Managers
 * @see {@link https://api.hypixel.net/#tag/SkyBlock}
 */
export class SkyBlockManager extends BaseManager {
	public constructor(client: Client) {
		super(client, true);
	}

	/**
	 * Fetch information regarding collections in the SkyBlock game
	 */
	public async fetchCollections(): Promise<FetchCollectionsResponse> {
		const data = await this.makeGetRequest<FetchCollectionsResponse>('/resources/skyblock/collections');
		return {
			lastUpdated: data.lastUpdated,
			version: data.version,
			collections: data.collections
		};
	}

	/**
	 * Fetch information regarding skills in the SkyBlock game
	 */
	public async fetchSkills(): Promise<FetchSkillsResponse> {
		const data = await this.makeGetRequest<FetchSkillsResponse>('/resources/skyblock/skills');
		return {
			lastUpdated: data.lastUpdated,
			version: data.version,
			collections: data.collections,
			skills: data.skills
		};
	}

	/**
	 * Fetch information regarding items in the SkyBlock game
	 */
	public async fetchItems(): Promise<FetchItemsResponse> {
		const data = await this.makeGetRequest<FetchItemsResponse>('/resources/skyblock/items');
		return {
			lastUpdated: data.lastUpdated,
			items: data.items
		};
	}

	/**
	 * Fetch information regarding the current mayor and ongoing election in SkyBlock
	 */
	public async fetchElectionAndMayor(): Promise<FetchElectionAndMayorResponse> {
		const data = await this.makeGetRequest<FetchElectionAndMayorResponse>('/resources/skyblock/election');
		return {
			lastUpdated: data.lastUpdated,
			mayor: data.mayor,
			current: data.current
		};
	}

	/**
	 * Fetch information regarding the current bingo event and its goals
	 */
	public async fetchActiveBingoGoals(): Promise<FetchActiveBingoGoalsResponse> {
		const data = await this.makeGetRequest<FetchActiveBingoGoalsResponse>('/resources/skyblock/bingo');
		return {
			lastUpdated: data.lastUpdated,
			id: data.id,
			goals: data.goals
		};
	}

	/**
	 * Fetch SkyBlock news
	 */
	public async fetchNews() {
		const data = await this.makeGetRequest<FetchNewsResponse>('/skyblock/news');
		return {
			items: data.items
		};
	}

	/**
	 * Fetch a SkyBlock auction.
	 * @param identifier The idenitifer you're using to fetch the auction
	 * @param type The type of identifier you're passing (either auction `uuid`, uuid of the `player`, uuid of the `profile`)
	 * @param raw Whether to return the raw response, without converting each auction to an @see{@link SkyBlockAuction} class. Defaults to `false`.
	 */
	public async fetchAuction(
		identifier: string,
		type: 'uuid' | 'player' | 'profile',
		raw = false
	): Promise<SkyBlockAuction[] | APISkyBlockAuction[]> {
		if (!identifier) throw new HypixelTSError('METHOD_MISSING_OPTION', 'SkyBlockManager', 'fetchAuction', 'identifier');
		if (!type) throw new HypixelTSError('METHOD_MISSING_OPTION', 'SkyBlockManager', 'fetchAuction', 'type');
		if (type !== 'uuid' && type !== 'player' && type !== 'profile')
			throw new HypixelTSError('METHOD_INVALID_OPTIONS', 'SkyBlockManager', 'fetchAuction', 'type', ['uuid', 'player', 'profile']);

		const { auctions } = await this.makeGetRequest<{ auctions: APISkyBlockAuction[] }>(`/skyblock/auction?${type}=${identifier}`);

		if (!raw) {
			const parsed = [];

			for (const auction of auctions) {
				parsed.push(new SkyBlockAuction(this.client, auction));
			}

			return parsed;
		}

		return auctions;
	}

	/**
	 * Fetch the currently active auctions (sorted by last updated first and paginated)
	 * @param page The page number
	 * @param resolveAuctions Whether to resolve the auctions returned, to a @see {@link SkyBlockAuction} class. Defaults to `true`.
	 */
	public async fetchActiveAuctions(page?: number, resolveAuctions = true) {
		if (page && typeof page !== 'number')
			throw new HypixelTSError('METHOD_INVALID_OPTIONS', 'SkyBlockManager', 'fetchActiveAuctions', 'page', ['number']);

		const data = await this.makeGetRequest<FetchActiveAuctionsResponse>('/skyblock/auctions');

		if (resolveAuctions) {
			const parsed = [];

			for (const auction of data.auctions) {
				parsed.push(new SkyBlockAuction(this.client, auction));
			}

			return {
				lastUpdated: data.lastUpdated,
				page: data.page,
				totalPages: data.totalPages,
				totalAuctions: data.totalAuctions,
				auctions: parsed
			};
		}

		return {
			lastUpdated: data.lastUpdated,
			page: data.page,
			totalPages: data.totalPages,
			totalAuctions: data.totalAuctions,
			auctions: data.auctions
		};
	}

	/**
	 * Fetch recently ended auctions (auctions which ended in the last 60 seconds).
	 */
	public async fetchRecentlyEndedAuctions(): Promise<RecentlyEndedAuctionsResponse> {
		const data = await this.makeGetRequest<RecentlyEndedAuctionsResponse>('/skyblock/auctions_ended');
		return {
			lastUpdated: data.lastUpdated,
			auctions: data.auctions
		};
	}

	/**
	 * Fetch bazaar items
	 */
	public async fetchBazaar(): Promise<FetchBazaarResponse> {
		const data = await this.makeGetRequest<FetchBazaarResponse>('/skyblock/bazaar');
		return {
			lastUpdated: data.lastUpdated,
			products: data.products
		};
	}

	/**
	 * Fetch a SkyBlock profile (using a SkyBlock profile uuid). The data returned can differ depending on the players in-game API settings.
	 * @param profileUuid The uuid of the SkyBlock profile
	 */
	public async fetchProfile(profileUuid: string): Promise<SkyBlockProfile> {
		if (!profileUuid) throw new HypixelTSError('METHOD_MISSING_OPTION', 'SkyBlockManager', 'fetchProfile', 'profileUuid');

		const data = await this.makeGetRequest<APISkyBlockProfile>(`/skyblock/profile?profile=${profileUuid}`);

		return new SkyBlockProfile(this.client, data);
	}

	/**
	 * Fetch a SkyBlock profiles of a player
	 * @param playerUuid The uuid of the player
	 */
	public async fetchPlayerSkyBlockProfiles(playerUuid: string): Promise<SkyBlockProfile[]> {
		if (!playerUuid) throw new HypixelTSError('METHOD_MISSING_OPTION', 'SkyBlockManager', 'fetchPlayerSkyBlockProfiles', 'playerUuid');

		const { profiles } = await this.makeGetRequest<{ profiles: APISkyBlockProfile[] }>(`/skyblock/profiles?uuid=${playerUuid}`);
		const parsed = [];

		for (const profile of profiles) {
			parsed.push(new SkyBlockProfile(this.client, profile));
		}

		return parsed;
	}

	/**
	 * Fetch SkyBlock museum data for all members of the provided profile uuid. The data returned can differ depending on the players in-game API settings.
	 * @param profileUuid The uuid of the SkyBlock profile
	 */
	public async fetchMuseumData(profileUuid: string): Promise<FetchMuseumDataResponse> {
		const data = await this.makeGetRequest<FetchMuseumDataResponse>(`/skyblock/museum/${profileUuid}`);
		return {
			profile: data.profile
		};
	}

	/**
	 * Fetch bingo data of a player
	 * @param playerUuid The uuid of the player
	 */
	public async fetchBingoData(playerUuid: string): Promise<FetchBingoDataResponse> {
		if (!playerUuid) throw new HypixelTSError('METHOD_MISSING_OPTION', 'SkyBlockManager', 'fetchBingoData', 'playerUuid');

		const data = await this.makeGetRequest<FetchBingoDataResponse>('/skyblock/bingo');
		return {
			events: data.events
		};
	}

	/**
	 * Fetch the currently active or upcoming Fire Sales for SkyBlock
	 */
	public async fetchFireSales(): Promise<FetchFireSalesResponse> {
		const { sales } = await this.makeGetRequest<{ sales: FetchFireSalesResponse }>('/skyblock/firesales');

		return sales;
	}
}
