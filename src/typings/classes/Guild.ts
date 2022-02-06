export interface APIGuild {
	_id: string;
	name: string;
	name_lower: string;
	description: string;
	tag: string;
	coins: number;
	coinsEver: number;
	created: number;
	joinable: boolean;
	publiclyListed: boolean;
	banner: { Base: number; Patterns: Record<string, unknown> };
	tagColor: string;
	achievements: Record<string, unknown>;
	exp: number;
	legacyRanking: number;
	ranks: APIGuildRanks[];
	members: APIGuildMember[];
	chatMute: number;
	preferredGames: string[];
	guildExpByGameType: Record<string, number>;
}

export interface APIGuildMember {
	uuid: string;
	name?: string;
	joined: number;
	rank: string;
	questParticipation: number;
	expHistory: Record<string, unknown>;
	mutedTill?: number;
}

export interface APIGuildRanks {
	name: string;
	default: boolean;
	tag: string;
	created: number;
	priority: number;
}
