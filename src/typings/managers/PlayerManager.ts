export interface GetPlayerFriendsRawResponse {
	_id: string;
	uuidSender: string;
	uuidReceiver: string;
	started: number;
}
[];

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

export interface GetRankedSkywarsDataResponse {
	key: string;
	position: number;
	score: number;
}
