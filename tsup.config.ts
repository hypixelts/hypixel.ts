import { defineConfig, type Options } from 'tsup';

const defaultOptions: Options = {
	clean: true,
	sourcemap: true,
	skipNodeModulesBundle: true,
	bundle: false,
	splitting: false,
	shims: true,
	keepNames: true,
	target: 'es2022',
	dts: true,
	entry: ['./src', '!./src/tests/', '!./src/lib/typings', '!./src/**/*.d.ts']
};

export default defineConfig([
	{
		...defaultOptions,
		format: ['cjs'],
		outDir: 'dist/cjs'
	},
	{
		...defaultOptions,
		format: ['esm'],
		outDir: 'dist/esm'
	}
]);
