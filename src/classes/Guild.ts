import { BaseClass } from '.';
import type { Client } from '../lib';
import type { APIGuild } from '../typings';

/**
 * Represents a Guild class.
 * @extends {APIGuild}
 */
export class Guild extends BaseClass {
	public _id!: string;
	public name!: string;
	public name_lower!: string;
	public description!: string;
	public tag!: string;
	public coins!: number;
	public coinsEver!: number;
	public created!: number;
	public joinable!: boolean;
	public publiclyListed!: boolean;
	public banner!: APIGuild['banner'];
	public tagColor!: string;
	public achievements!: APIGuild['achievements'];
	public exp!: number;
	public legacyRanking!: number;
	public ranks!: APIGuild['ranks'];
	public members!: APIGuild['members'];
	public chatMute!: number;
	public preferredGames!: string[];
	public guildExpByGameType!: APIGuild['guildExpByGameType'];

	public constructor(client: Client, data: APIGuild) {
		super(client);
		Object.assign(this, data);
	}
}
