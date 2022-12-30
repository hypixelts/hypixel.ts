// / <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		testTimeout: 15_000
	},
	envDir: './tests'
});
