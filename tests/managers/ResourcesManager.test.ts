import { Client } from '../../src';
import { test, expect } from 'vitest';

const client = new Client(process.env.HYPIXEL_API_KEY!);

test('ResourcesManager.gameInfo is instance of Object', async () => {
	const games = await client.resources.gameInfo();
	expect(games).toBeInstanceOf(Object);
});

test('ResourcesManager.getAchievements is instance of Object', async () => {
	const achievements = await client.resources.getAchievements();
	expect(achievements).toBeInstanceOf(Object);
});

test('ResourcesManager.getChallenges is instance of Object', async () => {
	const challenges = await client.resources.getChallenges();
	expect(challenges).toBeInstanceOf(Object);
});

test('ResourcesManager.getQuests is instance of Object', async () => {
	const quests = await client.resources.getQuests();
	expect(quests).toBeInstanceOf(Object);
});

test('ResourcesManager.getGuildAchievements is instance of Object', async () => {
	const guildAchievements = await client.resources.getGuildAchievements();
	expect(guildAchievements).toBeInstanceOf(Object);
});

test('ResourcesManager.getVanityPets is instance of Object', async () => {
	const vanityPets = await client.resources.getVanityCompanions();
	expect(vanityPets).toBeInstanceOf(Object);
});

test('ResourcesManager.getVanityCompanions is instance of Object', async () => {
	const vanityCompanions = await client.resources.getVanityCompanions();
	expect(vanityCompanions).toBeInstanceOf(Object);
});
