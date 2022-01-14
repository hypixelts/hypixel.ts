import { Client } from '../../src';
import { Player } from '../../src/classes';
import { test, expect } from 'vitest';
import { apiKey } from '../config';

const client = new Client(apiKey);

test('PlayerManager.fetch returns Player Object', async () => {
	const player = await client.players.fetch('armc');
	expect(player).toBeInstanceOf(Player);
});

test('PlayerManager.getFriends is instance of Array', async () => {
	const friends = await client.players.getFriends('armc');
	expect(friends).toBeInstanceOf(Array);
});

test('PlayerManager.getRecentlyPlayedGames is instance of Array', async () => {
	const games = await client.players.getRecentlyPlayedGames('armc');
	expect(games).toBeInstanceOf(Array);
});

test('PlayerManager.getStatus is instance of Object', async () => {
	const status = await client.players.getRecentlyPlayedGames('armc');
	expect(status).toBeInstanceOf(Object);
});

test('PlayerManager.getRankedSkywarsData is instance of Object', async () => {
	const status = await client.players.getRankedSkywarsData('lifelong');
	expect(status).toBeInstanceOf(Object);
});

test('PlayerManager.getUUID returns correct UUID', async () => {
	const status = await client.players.getUUID('armc');
	expect(status).toBe('ab589c4ed6804cd1b5ff3259980fb633');
});
