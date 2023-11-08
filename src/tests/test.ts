import { test as viTest } from 'vitest';
import { Client } from '../lib/Client';

interface TestFixtures {
	client: Client;
}

export const test = viTest.extend<TestFixtures>({
	client: new Client({ apiKey: process.env.VITE_HYPIXEL_API_KEY }).start()
});

declare module 'vitest' {
	export interface TestContext {
		client: Client;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			VITE_HYPIXEL_API_KEY: string;
			VITE_TESTING_USERNAME: string;
			VITE_TESTING_USER_UUID: string;
		}
	}
}
