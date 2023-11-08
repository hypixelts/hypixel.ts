import { test } from '../test';
import { expect, expectTypeOf } from 'vitest';
import { Player } from '../../lib/';

test('PlayerManager.get (with username) returns Player class', async ({ client }) => {
	const player = await client.players.get(process.env.VITE_TESTING_USERNAME);
	expect(player).toBeInstanceOf(Player);
});

test('PlayerManager.get (with uuid) returns Player class', async ({ client }) => {
	const player = await client.players.get(process.env.VITE_TESTING_USER_UUID);
	expect(player).toBeInstanceOf(Player);
});

test('PlayerManager.getRecentlyPlayedGames returns recently played games', async ({ client }) => {
	const games = await client.players.getRecentlyPlayedGames(process.env.VITE_TESTING_USER_UUID);
	expectTypeOf(games).toBeArray();
});

test('PlayerManager.getStatus returns current online status', async ({ client }) => {
	const status = await client.players.getStatus(process.env.VITE_TESTING_USER_UUID);
	console.log(status);
	expectTypeOf(status).toBeObject();
});
