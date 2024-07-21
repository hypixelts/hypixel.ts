import type { Util } from '../../classes/Util';

/**
 * Response returned by mojang API for user uuid lookup
 * @category Interfaces
 * @see {@link Util.getUUID}
 */
export interface GetUUIDResponse {
	name: string;
	id: string;
	errorMessage?: string;
}

/**
 * Response returned by mojang API for user name lookup
 * @category Interfaces
 * @see {@link Util.getUsername}
 */
export interface GetUsernameResponse {
	name: string;
	uuid: string;
	errorMessage?: string;
}
