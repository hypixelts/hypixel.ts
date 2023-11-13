import { test } from '../test';
import { expectTypeOf } from 'vitest';

test('OtherManager.fetchActiveNetworkBoosters returns active network boosters', async ({ client }) => {
	const data = await client.others.fetchActiveNetworkBoosters();
	expectTypeOf(data.boosters).toBeObject();
	expectTypeOf(data.boosterState).toBeObject();
});

test('OtherManager.fetchCurrentPlayerCounts returns current player counts', async ({ client }) => {
	const data = await client.others.fetchCurrentPlayerCounts();
	expectTypeOf(data.playerCount).toBeNumber();
});

test('OtherManager.fetchCurrentLeaderboards returns current leaderboards', async ({ client }) => {
	const data = await client.others.fetchCurrentLeaderboards();
	expectTypeOf(data.leaderboards).toBeObject();
});

test('OtherManager.fetchPunishmentStatistics returns punishment statistics', async ({ client }) => {
	const data = await client.others.fetchPunishmentStatistics();
	expectTypeOf(data.watchdog_lastMinute).toBeNumber();
	expectTypeOf(data.watchdog_total).toBeNumber();
	expectTypeOf(data.watchdog_rollingDaily).toBeNumber();
	expectTypeOf(data.staff_rollingDaily).toBeNumber();
	expectTypeOf(data.staff_total).toBeNumber();
});
