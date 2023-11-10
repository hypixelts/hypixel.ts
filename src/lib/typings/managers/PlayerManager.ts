/**
 * Recently played games returned by hypixel API
 * @see {@link PlayerManager.getRecentlyPlayedGames}
 */
export interface GetRecentlyPlayedGamesResponse {
	date: number;
	gameType: string;
	mode: string;
	map: string;
	ended: number;
}

/**
 * Status of a player returned by hypixel API
 * @see {@link PlayerManager.getStatus}
 */
export interface GetStatusResponse {
	online: boolean;
	gameType: string;
	mode: string;
	map: string;
}
