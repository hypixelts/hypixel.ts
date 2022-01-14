import type { RestManager } from './RestManager';
import type { RequestData } from '../lib/util';

/* eslint-disable */
const noop = () => {};
const methods = ['get'];
export type methods = 'get';
const reflectors = ['toString'];

export function buildRoute(manager: RestManager): any {
	const path = [''];
	const handler = {
		// @ts-ignore
		get(target: any, property: methods): any {
			if (reflectors.includes(property)) return () => path.join('/');
			if (methods.includes(property)) {
				const routeBucket: Array<string> = [];
				let currentDirectory: string;
				for (let i = 0; i < path.length; i++) {
					currentDirectory = path[i];
					routeBucket.push(currentDirectory);
				}
				return (options: RequestData<unknown, unknown>) =>
					manager.request(property, path.join('/'), Object.assign({ route: routeBucket.join('/') }, options));
			}
			path.push(property);
			return new Proxy(noop, handler);
		},
		// @ts-ignore
		apply(target: any, _: undefined, argumentsList: Array<any>): ProxyConstructor {
			path.push(...argumentsList.filter((arg) => arg != null));
			return new Proxy(noop, handler);
		}
	};
	return new Proxy(noop, handler);
}
