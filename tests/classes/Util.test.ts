import { Client } from '../../src';
import { test, expect } from 'vitest';

const client = new Client(process.env.HYPIXEL_API_KEY!);

test('Util.getUUID to be correct UUID', async () => {
	const status = await client.players.getUUID('armc');
	expect(status).toBe('ab589c4ed6804cd1b5ff3259980fb633');
});

test('Util.isUUID matches UUID Regex', () => {
	const uuid = 'ab589c4ed6804cd1b5ff3259980fb633';
	const regex = /^[0-9a-f]{32}$/i;
	expect(uuid).toMatch(regex);
});
