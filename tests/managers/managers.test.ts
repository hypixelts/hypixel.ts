import { BaseManager, PlayerManager, SkyBlockManager } from '../../src/managers';
import { test, expect } from 'vitest';

test('PlayerManager extends BaseManager', () => {
	expect(PlayerManager.prototype instanceof BaseManager).toBe(true);
});

test('SkyBlockManager extends BaseManager', () => {
	expect(SkyBlockManager.prototype instanceof BaseManager).toBe(true);
});
