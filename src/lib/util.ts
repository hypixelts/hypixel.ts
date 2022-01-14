import type { PetitioResponse } from 'petitio';

/**
 * Parses an API response and returns the body
 * @param res The response sent by the API
 * @returns The body of the response
 */
export async function parseResponse(res: PetitioResponse): Promise<Record<string, unknown>> {
	return res.json();
}

export interface RequestDataOptions<Q, B> {
	/**
	 * The query for the request
	 */
	query?: Q;

	/**
	 * The body for the request
	 */
	body?: B;
}

export class RequestData<Q = undefined, B = undefined> {
	/**
	 * The query for the request
	 */
	public query?: Q;

	/**
	 * The body of the request
	 */
	public body?: B;

	public constructor(data: RequestDataOptions<Q, B>) {
		this.query = data.query;
		this.body = data.body;
	}
}

export interface ExtendedRequestData<Q, B> extends RequestData<Q, B> {
	route: string;
}
