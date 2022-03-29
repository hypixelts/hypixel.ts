import { Client } from '../../src';
import { test, expect } from 'vitest';

const client = new Client(process.env.HYPIXEL_API_KEY!);

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

test('OtherManager.getAPIKeyInformation is instance of Object', async () => {
	const keyInformation = await client.other.getAPIKeyInformation();

	expect(keyInformation).toBeInstanceOf(Object);
});

test('OtherManager.getAPIKeyInformation returning the correct key', async () => {
	const keyInformation = await client.other.getAPIKeyInformation();

	expect(keyInformation.key).toBe(client.apiKey);
});

test('OtherManager.getAPIKeyInformation should return type number', async () => {
	const keyInformation = await client.other.getAPIKeyInformation();

	expect(typeof keyInformation.queriesInPastMin).toBe("number");
});
