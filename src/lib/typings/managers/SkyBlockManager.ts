import { BaseResourceResponse } from '.';

/**
 * Information regarding collections returned by the hypixel API.
 * @category Interfaces
 */
export interface FetchCollectionsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
}

/**
 * @category Interfaces
 */
export interface FetchCollectionsResponseCollection {
	name: string;
	items: Record<string, unknown>;
}

/**
 * Information regarding skills returned by the hypixel API.
 * @category Interfaces
 */
export interface FetchSkillsResponse extends BaseResourceResponse {
	version: string;
	collections: Record<string, FetchCollectionsResponseCollection>;
	skills: Record<string, FetchSkillsResponseSkill>;
}

/**
 * @category Interfaces
 */
export interface FetchSkillsResponseCollection {
	name: string;
	description: string;
	maxLevel: number;
	levels: Array<Record<string, unknown>>;
}

/**
 * @category Interfaces
 */
export interface FetchSkillsResponseSkill extends FetchCollectionsResponseCollection {}

/**
 * Information regarding items in the SkyBlock game
 * @category Interfaces
 */
export interface FetchItemsResponse extends BaseResourceResponse {
	items: Array<Record<string, FetchItemsResponseItem | string>>;
}

/**
 * @category Interfaces
 */
export interface FetchItemsResponseItem {
	id: string;
	name: string;
	tier: string;
	unstackable: boolean;
}

/**
 * Information regarding the current mayor and ongoing election in SkyBlock
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponse extends BaseResourceResponse {
	mayor: FetchElectionAndMayorResponseMayor;
	current: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseMayor {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	election: FetchElectionAndMayorResponseElection;
	current: FetchElectionAndMayorResponseCurrent;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseMayorPerks {
	name: string;
	description: string;
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseElection {
	year: number;
	candidates: FetchElectionAndMayorResponseElectionCandidate[];
}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseCurrent extends FetchElectionAndMayorResponseElection {}

/**
 * @category Interfaces
 */
export interface FetchElectionAndMayorResponseElectionCandidate {
	key: string;
	name: string;
	perks: FetchElectionAndMayorResponseMayorPerks[];
	votes: number;
}

/**
 * Information regarding the current bingo event and its goals
 * @category Interfaces
 */
export interface FetchActiveBingoGoalsResponse extends BaseResourceResponse {
	id: number;
	goals: FetchActiveBingoGoalsResponseGoal[];
}

/**
 * @category Interfaces
 */
export interface FetchActiveBingoGoalsResponseGoal {
	id: string;
	name: string;
	tiers?: number[];
	progress?: number;
	lore?: string;
	requiredAmount?: number;
}

/**
 *
 */
export interface FetchNewsResponse extends BaseResourceResponse {
	items: FetchNewsResponseItem[];
}

/**
 * @category Interfaces
 */
export interface FetchNewsResponseItem {
	item: {
		material: string;
	};
	link: string;
	text: string;
	title: string;
}
