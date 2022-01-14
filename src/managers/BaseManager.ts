import type { Client } from '../lib';

export class BaseManager {
	public client: Client;
	public constructor(client: Client) {
		this.client = client;
	}
}
