import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		sequence: {
			hooks: 'list'
		},
		fileParallelism: false,
		globals: true,
		testTimeout: 15_000
	},
	envDir: './src/tests'
});
