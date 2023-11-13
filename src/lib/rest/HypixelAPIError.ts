/**
 * Response body when an error is returned by the hypixel api
 * @category Rest
 * @group Rest
 */
export interface HypixelAPIErrorResponse {
	/**
	 * Whether or not the request is successful
	 */
	success: boolean;

	/**
	 * The message explaining the error
	 */
	cause: string;
}

/**
 * Error thrown when an error is encountered while querying the hypixel API
 * @category Rest
 * @group Rest
 */
export class HypixelAPIError extends Error {
	public code: number;

	public constructor(message: string, code: number) {
		super(message);
		this.message = message;
		this.code = code;
	}
}
