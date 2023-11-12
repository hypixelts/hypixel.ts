import { test } from '../test';
import { expect } from 'vitest';

test('ResourceManager.fetchGameInformation returns game information', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchGameInformation();
	expect(info.games).toBeTypeOf('object');
});

test('ResourceManager.fetchAchievements returns all achievements', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchAchievements();
	expect(info.achievements).toBeTypeOf('object');
});

test('ResourceManager.fetchChallenges returns all challenges', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchChallenges();
	expect(info.challenges).toBeTypeOf('object');
});

test('ResourceManager.fetchQuests returns all quests', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchQuests();
	expect(info.quests).toBeTypeOf('object');
});

test('ResourceManager.fetchGuildAchievements returns all guild achievements', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchGuildAchievements();
	expect(info.one_time).toBeTypeOf('object');
	expect(info.tiered).toBeTypeOf('object');
});

test('ResourceManager.fetchVanityPets returns all vanity pets', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchVanityPets();
	expect(info.types).toBeTypeOf('object');
	expect(info.rarities).toBeTypeOf('object');
});

test('ResourceManager.fetchVanityCompanions returns all vanity companions', async ({ nonAuthClient }) => {
	const info = await nonAuthClient.resources.fetchVanityCompanions();
	expect(info.types).toBeTypeOf('object');
	expect(info.rarities).toBeTypeOf('object');
});
