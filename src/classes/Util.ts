import { BaseClass } from './Base';
import petitio from 'petitio';
import { HypixelJSError } from '../errors';
import type { Client } from '../lib';
import type { GetUUIDResponse } from '../typings';

export class Util extends BaseClass {
	public constructor(client: Client) {
		super(client);
	}

	public async getUUID(name: string) {
		try {
			const data = await petitio(`https://api.mojang.com/users/profiles/minecraft/${name}`).send();
			const json = (await data.json()) as GetUUIDResponse;

			if (json.error) throw new HypixelJSError('GET_UUID_ERROR', json.error, data.statusCode);

			return json.id;
		} catch {
			throw new HypixelJSError('GET_UUID_404');
		}
	}

	public isUUID(uuid: string) {
		const regex = /^[0-9a-f]{32}$/i;
		return regex.test(uuid);
	}
}
