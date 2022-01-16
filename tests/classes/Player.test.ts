import { Client } from '../../src';
import { test, expect } from 'vitest';

const client = new Client(process.env.HYPIXEL_API_KEY!);

test("Player.getFriends returns Array of friend uuid's", async () => {
	const player = await client.players.fetch('armc');
	const friends = await player.getFriends();

	expect(friends).toBeInstanceOf(Array);
});

test('Player.recentlyPlayedGames returns Array of recently played games', async () => {
	const player = await client.players.fetch('armc');
	const games = await player.recentlyPlayedGames;

	expect(games).toBeInstanceOf(Array);
});

test('Player.status returns Object of player status', async () => {
	const player = await client.players.fetch('armc');
	const status = await player.status;

	expect(status).toBeInstanceOf(Object);
});

test('Player.rankedSkywarsData returns Object of skywars data', async () => {
	const player = await client.players.fetch('lifelong');
	const data = await player.rankedSkywarsData;

	expect(data).toBeInstanceOf(Object);
});
