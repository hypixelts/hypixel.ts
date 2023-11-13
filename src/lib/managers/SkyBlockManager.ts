import { BaseManager } from '.';
import { Client } from '../Client';
import type {
	FetchCollectionsResponse,
	FetchSkillsResponse,
	FetchItemsResponse,
	FetchElectionAndMayorResponse,
	FetchActiveBingoGoalsResponse,
	FetchNewsResponse
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
		return data;
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
}
