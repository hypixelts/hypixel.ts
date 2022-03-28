import { BaseClass } from '.';
import petitio from 'petitio';
import { HypixelTSError } from '../errors';
import type { Client } from '../lib';
import type { GetUsernameResponse, GetUUIDResponse } from '../typings';

/**
 * Represents a Util class used for util methods.
 */
export class Util extends BaseClass {
	public constructor(client: Client) {
		super(client);
	}

	/**
	 * Get the UUID of a player by providing their name.
	 * @param {string} name: The name of the player
	 * @returns {Promise<string>}
	 */
	public async getUUID(name: string) {
		try {
			const data = await petitio(`https://api.mojang.com/users/profiles/minecraft/${name}`).send();
			const json = (await data.json()) as GetUUIDResponse;

			if (json.error) throw new HypixelTSError('GET_UUID_ERROR', json.error, data.statusCode);

			return json.id;
		} catch {
			throw new HypixelTSError('GET_UUID_404');
		}
	}

	/**
	 * Get player's name from their UUID
	 * @param {string} uuid: The uuid of the player
	 * @returns {Promise<string>}
	 */
	 public async getUsername(uuid: string) {
		if (!this.isUUID(uuid)) {
			throw new HypixelTSError('NOT_UUID');
		}

		try {
			const data = await petitio(`https://api.mojang.com/user/profile/${uuid}`).send();
			const json = (await data.json()) as GetUsernameResponse;

			if (json.error) throw new HypixelTSError('GET_USERNAME_ERROR', json.error, data.statusCode);

			return json.name;
		} catch {
			throw new HypixelTSError('GET_USERNAME_404');
		}
	}

	/**
	 * Check whether the provided UUID is a valid UUID or not.
	 * @param {string} uuid: The UUID to check
	 * @returns {boolean}
	 */
	public isUUID(uuid: string) {
		const regex = /^[0-9a-f]{32}$/i;
		return regex.test(uuid);
	}
}
