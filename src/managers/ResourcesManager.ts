import { BaseManager } from '.';
import type { Client } from '../lib';
import type {
	GameInfoResponse,
	GetAchievementsResponse,
	GetChallengesResponse,
	GetQuestsResponse,
	GetGuildAchievementsResponse,
	GetVanityPets,
	GetVanityCompanions
} from '../typings';

/**
 * The manager for resource related endpoints.
 * @extends {BaseManager}
 */
export class ResourcesManager extends BaseManager {
	/**
	 * The client that instantiated this manager.
	 * @type {Client}
	 */
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Get info regarding all the games on hypixel.
	 * @returns {Promise<GameInfoResponse>}
	 */
	public async gameInfo(): Promise<GameInfoResponse> {
		const { lastUpdated, games } = await this.client.api.resources.games.get();
		return { lastUpdated, games };
	}

	/**
	 * Get all the achievements.
	 * @returns {Promise<GetAchievementsResponse>}
	 */
	public async getAchievements(): Promise<GetAchievementsResponse> {
		const { lastUpdated, achievements } = await this.client.api.resources.achievements.get();
		return { lastUpdated, achievements };
	}

	/**
	 * Get all the challenges.
	 * @returns {Promise<GetChallengesResponse>}
	 */
	public async getChallenges(): Promise<GetChallengesResponse> {
		const { lastUpdated, challenges } = await this.client.api.resources.challenges.get();
		return { lastUpdated, challenges };
	}

	/**
	 * Get all the quests.
	 * @returns {Promise<GetQuestsResponse>}
	 */
	public async getQuests(): Promise<GetQuestsResponse> {
		const { lastUpdated, quests } = await this.client.api.resources.quests.get();
		return { lastUpdated, quests };
	}

	/**
	 * Get all the guild achievements.
	 * @returns {Promise<GetGuildAchievementsResponse>}
	 */
	public async getGuildAchievements(): Promise<GetGuildAchievementsResponse> {
		const { lastUpdated, one_time, tiered } = await this.client.api.resources.guilds.achievements.get();
		return { lastUpdated, one_time, tiered };
	}

	/**
	 * Get all the vanity pets.
	 * @returns {Promise<GetVanityPets>}
	 */
	public async getVanityPets(): Promise<GetVanityPets> {
		const { lastUpdated, types, rarities } = await this.client.api.resources.vanity.pets.get();
		return { lastUpdated, types, rarities };
	}

	/**
	 * Get all the vanity companions.
	 * @returns {Promise<GetVanityCompanions>}
	 */
	public async getVanityCompanions(): Promise<GetVanityCompanions> {
		const { lastUpdated, types, rarities } = await this.client.api.resources.vanity.companions.get();
		return { lastUpdated, types, rarities };
	}
}
