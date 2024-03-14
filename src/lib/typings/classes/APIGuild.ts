/**
 * The Guild object returned from the API (in JSON) which is converted to @see {@link Guild} class.
 * @category Interfaces
 */
export interface APIGuild {
	_id: string;
	id: string;
	name: string;
	nameLower: string;
	coins: number;
	coinsEver: number;
	created: number;
	members: APIGuildMember[];
	ranks: APIGuildRank[];
	achievements: Record<string, number>;
	exp: number;
	guildExpByGameType: Record<string, number>;
}

/**
 * @category Interfaces
 */
export interface APIGuildMember {
	uuid: string;
	rank: string;
	joined: number;
	questParticipation: number;
	expHistory: Record<string, number>;
}

/**
 * @category Interfaces
 */
export interface APIGuildRank {
	name: string;
	priority: number;
	created: number;
	default?: boolean;
}
