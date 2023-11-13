import { Base } from '.';
import { HypixelTSError } from '../errors';
import type { GetUsernameResponse, GetUUIDResponse } from '../typings';

/**
 * Utility functions
 * @category Classes
 * @group Classes
 */
export class Util extends Base {
	/**
	 * Get the UUID of a player by providing their name
	 * @param name The name of the player
	 */
	public static async getUUID(name: string): Promise<string> {
		try {
			const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
			const json = (await data.json()) as GetUUIDResponse;

			if (json.errorMessage) throw new HypixelTSError('GET_UUID_ERROR', json.errorMessage, data.status);
			return json.id;
		} catch {
			throw new HypixelTSError('GET_UUID_404');
		}
	}

	/**
	 * Get player's name from their UUID
	 * @param uuid The uuid of the player
	 */
	public static async getUsername(uuid: string): Promise<string> {
		if (!this.isUUID(uuid)) {
			throw new HypixelTSError('NOT_UUID');
		}

		try {
			const data = await fetch(`https://api.mojang.com/user/profile/${uuid}`);
			const json = (await data.json()) as GetUsernameResponse;

			if (json.errorMessage) throw new HypixelTSError('GET_USERNAME_ERROR', json.errorMessage, data.status);

			return json.name;
		} catch {
			throw new HypixelTSError('GET_USERNAME_404');
		}
	}

	/**
	 * Check whether the provided UUID is a valid UUID or not
	 * @param uuid The UUID to check
	 */
	public static isUUID(uuid: string) {
		const regexStripped = /^[0-9a-f]{32}$/i;
		const regexFull = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/i;
		return regexStripped.test(uuid) || regexFull.test(uuid);
	}
}
