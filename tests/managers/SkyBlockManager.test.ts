import { Client } from '../../src';
import { SkyBlockProfile } from '../../src/classes';
import { test, expect } from 'vitest';

const client = new Client(process.env.VITE_HYPIXEL_API_KEY!);

test('SkyBlockManager.collections is instance of Object', async () => {
	const collections = await client.skyblock.collections();
	expect(collections).toBeInstanceOf(Object);
});

test('SkyBlockManager.skills is instance of Object', async () => {
	const skills = await client.skyblock.skills();
	expect(skills).toBeInstanceOf(Object);
});

test('SkyBlockManager.items is instance of Object', async () => {
	const items = await client.skyblock.items();
	expect(items).toBeInstanceOf(Object);
});

test('SkyBlockManager.getNews is instance of Object', async () => {
	const news = await client.skyblock.getNews();
	expect(news).toBeInstanceOf(Object);
});

test('SkyBlockManager.getActiveAuctions is instance of Object', async () => {
	const auctions = await client.skyblock.getActiveAuctions();
	expect(auctions).toBeInstanceOf(Object);
});

test('SkyBlockManager.recentlyEndedAuctions is instance of Object', async () => {
	const ended = await client.skyblock.recentlyEndedAuctions();
	expect(ended).toBeInstanceOf(Object);
});

test('SkyBlockManager.getProfile is instance of SkyBlockProfile', async () => {
	const profile = await client.skyblock.getProfile('longlife');
	expect(profile).toBeInstanceOf(SkyBlockProfile);
});
