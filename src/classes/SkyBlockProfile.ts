import { BaseClass } from './Base';
import type { Client } from '../lib';

export interface APISkyBlockProfile {
	profile_id: string;
	members: Record<string, any>;
	community_upgrades: Record<string, any>;
	cute_name: string;
	banking: Record<string, any>;
	game_mode: string;
}

/**
 * Represents a SkyBlock profile.
 * @extends {BaseClass}
 */
export class SkyBlockProfile extends BaseClass {
	public profile_id!: string;
	public members!: Record<string, any>;
	public community_upgrades?: Record<string, any>;
	public cute_name?: string;
	public banking?: Record<string, any>;
	public game_mode?: string;

	public constructor(client: Client, data: APISkyBlockProfile) {
		super(client);
		Object.assign(this, data);
	}
}
