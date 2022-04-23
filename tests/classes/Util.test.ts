import { Client } from '../../src';
import { test, expect } from 'vitest';
import { v4 } from 'uuid';

const client = new Client(process.env.HYPIXEL_API_KEY!);

test('Util.getUUID to be correct UUID', async () => {
	const status = await client.players.getUUID('Thorin');
	expect(status).toBe('5de3d1d51a954fb3a2b788e4938ae11c');
});

test('Util.isUUID matches UUID Regex', () => {
	const uuid = v4();

	expect(client.util.isUUID(uuid)).toBeTruthy();
});

test('Util.getUsername to be the correct Username', async () => {
	const username = await client.util.getUsername('5de3d1d5-1a95-4fb3-a2b7-88e4938ae11c');

	expect(username).toBe('Thorin');
});
