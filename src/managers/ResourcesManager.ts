import { BaseManager } from './BaseManager';
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

export class ResourcesManager extends BaseManager {
	public constructor(client: Client) {
		super(client);
	}

	public async gameInfo(): Promise<GameInfoResponse> {
		const { lastUpdated, games } = await this.client.api.resources.games.get();
		return { lastUpdated, games };
	}

	public async getAchievements(): Promise<GetAchievementsResponse> {
		const { lastUpdated, achievements } = await this.client.api.resources.achievements.get();
		return { lastUpdated, achievements };
	}

	public async getChallenges(): Promise<GetChallengesResponse> {
		const { lastUpdated, challenges } = await this.client.api.resources.challenges.get();
		return { lastUpdated, challenges };
	}

	public async getQuests(): Promise<GetQuestsResponse> {
		const { lastUpdated, quests } = await this.client.api.resources.quests.get();
		return { lastUpdated, quests };
	}

	public async getGuildAchievements(): Promise<GetGuildAchievementsResponse> {
		const { lastUpdated, one_time, tiered } = await this.client.api.resources.guilds.achievements.get();
		return { lastUpdated, one_time, tiered };
	}

	public async getVanityPets(): Promise<GetVanityPets> {
		const { lastUpdated, types, rarities } = await this.client.api.resources.vanity.pets.get();
		return { lastUpdated, types, rarities };
	}

	public async getVanityCompanions(): Promise<GetVanityCompanions> {
		const { lastUpdated, types, rarities } = await this.client.api.resources.vanity.companions.get();
		return { lastUpdated, types, rarities };
	}
}
