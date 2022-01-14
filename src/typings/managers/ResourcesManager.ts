export interface GameInfoResponse {
	lastUpdated: number;
	games: {
		[T: string]: Game;
	};
}

export interface Game {
	id: number;
	name: string;
	databaseName: string;
	modeNames?: Record<any, any>;
	retired?: boolean;
	legacy?: boolean;
}

export interface GetAchievementsResponse {
	lastUpdated: number;
	achievements: Record<any, any>;
}

export interface GetChallengesResponse extends Omit<GetAchievementsResponse, 'achievements'> {
	challenges: Record<any, any>;
}

export interface GetQuestsResponse extends Omit<GetAchievementsResponse, 'achievements'> {
	quests: Record<any, any>;
}

export interface GetGuildAchievementsResponse extends Omit<GetAchievementsResponse, 'achievements'> {
	one_time: Record<any, any>;
	tiered: Record<any, any>;
}

export interface GetVanityPets extends Omit<GetAchievementsResponse, 'achievements'> {
	types: Record<any, any>;
	rarities: Record<any, any>;
}

export type GetVanityCompanions = GetVanityPets;
