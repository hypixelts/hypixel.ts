import { Client } from '../../src';
import { test, expect } from 'vitest';

const client = new Client(process.env.VITE_HYPIXEL_API_KEY!);

test('Player.recentlyPlayedGames returns Array of recently played games', async () => {
	const player = await client.players.fetch('Thorin');
	const games = await player.recentlyPlayedGames;

	expect(games).toBeInstanceOf(Array);
});

test('Player.status returns Object of player status', async () => {
	const player = await client.players.fetch('Thorin');
	const status = await player.status;

	expect(status).toBeInstanceOf(Object);
});

test('Player.name returns the correct name', async () => {
	const playerName = 'Thorin';
	const player = await client.players.fetch(playerName);

	expect(player.playername).toBe(playerName.toLowerCase());
});

test('Player.uuid returns the correct uuid', async () => {
	const playerUUID = await client.util.getUUID('Thorin');
	const player = await client.players.fetch(playerUUID);

	expect(player.uuid).toBe(playerUUID);
});

test('Player.rankedSkywarsData returns Object of skywars data', async () => {
	const player = await client.players.fetch('lifelong');
	const data = await player.rankedSkywarsData;

	expect(data).toBeInstanceOf(Object);
});
