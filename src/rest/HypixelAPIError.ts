export interface HypixelAPIErrorResponse {
	success: boolean;
	cause: string;
}

export class HypixelAPIError extends Error {
	public code: number;

	public constructor(message: string, code: number) {
		super(message);
		this.message = message;
		this.code = code;
	}
}
