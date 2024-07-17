/**
 * Response body when an error is returned by the hypixel api
 * @category Rest
 * @group Rest
 */
interface HypixelAPIErrorResponse {
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
declare class HypixelAPIError extends Error {
    code: number;
    constructor(message: string, code: number);
}

export { HypixelAPIError, type HypixelAPIErrorResponse };
