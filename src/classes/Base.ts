import type { Client } from '../lib/Client';

export class BaseClass {
	public client: Client;
	public constructor(client: Client) {
		this.client = client;
	}
}
