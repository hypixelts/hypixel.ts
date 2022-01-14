import { Client } from '../../src';
import { test, expect } from 'vitest';
import { apiKey } from '../config';

const client = new Client(apiKey);

test('OtherManager.getActiveBoosters is instance of Object', async () => {
	const boosters = await client.other.getActiveBoosters();
	expect(boosters).toBeInstanceOf(Object);
});

test('OtherManager.getPlayerCount is instance of Object', async () => {
	const playerCount = await client.other.getPlayerCount();
	expect(playerCount).toBeInstanceOf(Object);
});

test('OtherManager.getLeaderboard is instance of Object', async () => {
	const leaderboard = await client.other.getLeaderboard();
	expect(leaderboard).toBeInstanceOf(Object);
});

test('OtherManager.getPunishmentStatistics is instance of Object', async () => {
	const punishmentstats = await client.other.getPunishmentStatistics();
	expect(punishmentstats).toBeInstanceOf(Object);
});
