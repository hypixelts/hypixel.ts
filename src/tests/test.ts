import { test as viTest, type TestAPI } from 'vitest';
import { Client } from '../lib/Client';

interface TestFixtures {
	client: Client;
	nonAuthClient: Client;
}

export const test = (viTest as TestAPI).extend<TestFixtures>({
	client: async ({}, use) => {
		const client = new Client({ apiKeys: [process.env.VITE_HYPIXEL_API_KEY] }).start();
		await use(client);
	},
	nonAuthClient: async ({}, use) => {
		const client = new Client().start();
		await use(client);
	}
});

declare module 'vitest' {
	export interface TestContext {
		client: Client;
		nonAuthClient: Client;
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
