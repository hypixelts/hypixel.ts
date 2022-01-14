import { BaseClass, Player, Util } from '../../src/classes';
import { test, expect } from 'vitest';

test('Player extends BaseClass', () => {
	expect(Player.prototype instanceof BaseClass).toBe(true);
});

test('Util extends BaseClass', () => {
	expect(Util.prototype instanceof BaseClass).toBe(true);
});
