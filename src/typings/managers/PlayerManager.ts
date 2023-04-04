export interface GetRecentlyPlayedGamesResponse {
	date: number;
	gameType: string;
	mode: string;
	map: string;
	ended: number;
}

export interface GetStatusResponse {
	online: boolean;
	gameType: string;
	mode: string;
	map: string;
}
