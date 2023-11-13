import { BaseManager } from '.';
import type { Client } from '../Client';
import type {
	VanityPetsResponse,
	AchievementsResponse,
	ChallengesResponse,
	GameInformationResponse,
	GuildAchievementsResponse,
	QuestsResponse,
	VanityCompanionsResponse
} from '../';

/**
 * Resource endpoints.
 *
 * **Note**: API Key authorization is not required to use this manager.
 *
 * @category Managers
 * @group Managers
 */
export class ResourceManager extends BaseManager {
	public constructor(client: Client) {
		super(client, false);
	}

	/**
	 * Fetch information about Hypixel games
	 */
	public async fetchGameInformation() {
		return this.makeGetRequest<GameInformationResponse>('/resources/games');
	}

	/**
	 * Fetch all achievements
	 */
	public async fetchAchievements() {
		return this.makeGetRequest<AchievementsResponse>('/resources/achievements');
	}

	/**
	 * Fetch all challenges
	 */
	public async fetchChallenges() {
		return this.makeGetRequest<ChallengesResponse>('/resources/challenges');
	}

	/**
	 * Fetch all quests
	 */
	public async fetchQuests() {
		return this.makeGetRequest<QuestsResponse>('/resources/quests');
	}

	/**
	 * Fetch all guild achievements
	 */
	public async fetchGuildAchievements() {
		return this.makeGetRequest<GuildAchievementsResponse>('/resources/guilds/achievements');
	}

	/**
	 * Fetch all vanity pets
	 */
	public async fetchVanityPets() {
		return this.makeGetRequest<VanityPetsResponse>('/resources/vanity/pets');
	}

	/**
	 * Fetch all vanity companions
	 */
	public async fetchVanityCompanions() {
		return this.makeGetRequest<VanityCompanionsResponse>('/resources/vanity/companions');
	}
}
