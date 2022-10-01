import { Client } from '../../src';
import { Player } from '../../src/classes';
import { test, expect } from 'vitest';

const client = new Client(process.env.VITE_HYPIXEL_API_KEY!);

test('PlayerManager.fetch returns Player Object', async () => {
	const player = await client.players.fetch('Thorin');
	expect(player).toBeInstanceOf(Player);
});

test('PlayerManager.getFriends is instance of Array', async () => {
	const friends = await client.players.getFriends('Thorin');
	expect(friends).toBeInstanceOf(Array);
});

test('PlayerManager.getRecentlyPlayedGames is instance of Array', async () => {
	const games = await client.players.getRecentlyPlayedGames('Thorin');
	expect(games).toBeInstanceOf(Array);
});

test('PlayerManager.getStatus is instance of Object', async () => {
	const status = await client.players.getRecentlyPlayedGames('Thorin');
	expect(status).toBeInstanceOf(Object);
});

test('PlayerManager.getRankedSkywarsData is instance of Object', async () => {
	const status = await client.players.getRankedSkywarsData('lifelong');
	expect(status).toBeInstanceOf(Object);
});

test('PlayerManager.getUUID returns correct UUID', async () => {
	const status = await client.players.getUUID('Thorin');
	expect(status).toBe('5de3d1d51a954fb3a2b788e4938ae11c');
});
