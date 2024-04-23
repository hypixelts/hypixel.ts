import { expect } from 'vitest';
import { SkyBlockProfile } from '../../lib/classes/SkyBlockProfile';
import { test } from '../test';

test('SkyBlockManager.fetchCollections returns collections', async ({ client }) => {
	const { collections } = await client.skyblock.fetchCollections();
	expect(collections).toBeTypeOf('object');
});

test('SkyBlockManager.fetchSkills returns skills', async ({ client }) => {
	const { skills } = await client.skyblock.fetchSkills();
	expect(skills).toBeTypeOf('object');
});

test('SkyBlockManager.fetchItems returns items', async ({ client }) => {
	const { items } = await client.skyblock.fetchItems();
	expect(items).toBeTypeOf('object');
});

test('SkyBlockManager.fetchElectionAndMayor returns election and mayor', async ({ client }) => {
	const { mayor, current } = await client.skyblock.fetchElectionAndMayor();
	expect(mayor).toBeTypeOf('object');
	expect(current).toBeTypeOf('object');
});

test('SkyBlockManager.fetchActiveBingoGoals returns bingo goals', async ({ client }) => {
	const { goals } = await client.skyblock.fetchActiveBingoGoals();
	expect(goals).toBeInstanceOf(Array);
});

test('SkyBlockManager.fetchNews returns news', async ({ client }) => {
	const { items } = await client.skyblock.fetchNews();
	expect(items).toBeInstanceOf(Array);
});

test('SkyBlockManager.fetchAuction returns SkyBlockAuction', async ({ client }) => {
	const auction = await client.skyblock.fetchAuction('d62e8944ca274bcb8b0e43959446d659', 'player');
	expect(auction).toBeInstanceOf(Array);
});

test('SkyBlockManager.fetchActiveAuctions returns SkyBlockAuction', async ({ client }) => {
	const { auctions } = await client.skyblock.fetchActiveAuctions();
	expect(auctions).toBeInstanceOf(Array);
});

test('SkyBlockManager.fetchBazaar returns bazaar', async ({ client }) => {
	const { products } = await client.skyblock.fetchBazaar();
	expect(products).toBeTypeOf('object');
});

test('SkyBlockManager.fetchProfile returns profile', async ({ client }) => {
	const product = await client.skyblock.fetchProfile('20ff3b4fbeae437c968d90d18e9293cc');
	expect(product).toBeInstanceOf(SkyBlockProfile);
});

test('SkyBlockManager.fetchPlayerSkyBlockProfiles returns player profiles', async ({ client }) => {
	const members = await client.skyblock.fetchPlayerSkyBlockProfiles('d62e8944ca274bcb8b0e43959446d659');
	expect(members).toBeTypeOf('object');
});

test('SkyBlockManager.fetchBingoData returns bingo data', async ({ client }) => {
	const { events } = await client.skyblock.fetchBingoData('20ff3b4fbeae437c968d90d18e9293cc');
	console.log(events);
	expect(events).toBeInstanceOf(Array);
});

test('SkyBlockManager.fetchFireSales returns fire sales', async ({ client }) => {
	const sales = await client.skyblock.fetchFireSales();
	expect(sales).toBeInstanceOf(Array);
});
