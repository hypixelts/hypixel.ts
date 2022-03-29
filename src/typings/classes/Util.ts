export interface GetUUIDResponse {
	name: string;
	id: string;
	error?: string;
}

export interface GetUsernameResponse {
	name: string;
	uuid: string;
	error?: string;
}
