import { Guild } from '../../lib';
import { test } from '../test';
import { expect } from 'vitest';

test('GuildManager.fetch returns guild on providing id.', async ({ client }) => {
	const guild = await client.guilds.fetch('5bdfc1c58b6caf34126841f7', 'id');
	expect(guild).toBeInstanceOf(Guild);
});

test('GuildManager.fetch returns guild on providing name.', async ({ client }) => {
	const guild = await client.guilds.fetch('enigma', 'name');
	expect(guild).toBeInstanceOf(Guild);
});

test('GuildManager.fetch returns guild on providing player uuid.', async ({ client }) => {
	const guild = await client.guilds.fetch('f7b1e243b74f41969e87ef535aa7a185', 'player');
	expect(guild).toBeInstanceOf(Guild);
});
