import { register } from './HypixelTSError';

const messages = {
	CLIENT_OPTIONS_MISSING: (option?: string) => `ClientOptions${option ? `.${option}` : ''} ${option ? 'is' : 'are'} missing`,
	CLIENT_OPTION_INVALID_TYPE: (option: string, type: string, received?: string) =>
		`ClientOption.${option} is expected to be of type "${type}", received "${received}"`,
	API_KEYS_EXHAUSTED: (length: number) => `All ${length} API keys have been exhausted with no successful requests. Please check logs for details.`,
	GET_UUID_ERROR: (error: string, code: number) => `Util.getUUID: Failed with error ${error}, status code ${code}`,
	GET_UUID_404: `Util.getUUID: Player not found`,
	GET_USERNAME_ERROR: (error: string, code: number) => `Util.getUsername: Failed with error ${error}, status code ${code}`,
	GET_USERNAME_404: `Util.getUsername: Player not found`,
	NOT_UUID: `The supplied string was not of the correct format for a UUID`,
	METHOD_MISSING_OPTION: (manager: string, method: string, option: string) => `${manager}.${method}: Required option "${option}" is missing`,
	METHOD_INVALID_OPTIONS: (manager: string, method: string, option: string, expected: string[]) =>
		`${manager}.${method}: Invalid options provided. Expected type "${
			expected?.length > 1 ? `either ${expected.join(', ')}` : expected.join(', ')
		}" for the "${option}" option`
};

for (const [key, value] of Object.entries(messages)) register(key, value);
