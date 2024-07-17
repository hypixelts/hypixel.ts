/**
 * The Museum object returned from the API (in JSON) which is converted to the @see {@link SkyBlockMuseum} class.
 * @category Interfaces
 */
export interface APISkyBlockMuseum {
	value: number
	appraisal: boolean
	items: APISkyBlockMuseumItemObject
	special: APISkyBlockMuseumItem[]
}

export interface APISkyBlockMuseumItemObject {
	[key: string]: APISkyBlockMuseumItem
}

/**
 * @category Interfaces
 */
export interface APISkyBlockMuseumItem {
	donated_time: number
	items: APISkyBlockMuseumItemItem
}

/**
 * @category Interfaces
 */
export interface APISkyBlockMuseumItemItem {
	type: number
	data: string
}