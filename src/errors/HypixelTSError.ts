type ErrorMessageSupplier = (...args: any[]) => string;

const messages = new Map<string, string | ErrorMessageSupplier>();

export class HypixelTSError extends Error {
	public constructor(key: string, ...args: any[]) {
		super(getMessage(key, args));

		function getMessage(key: string, args: any[]) {
			if (typeof key !== 'string') throw new Error('[getMessage]: argument key must be a string');
			const msg = messages.get(key);

			if (!msg) throw new Error(`[getMessage]: An invalid error key was provided: ${key}`);
			if (typeof msg === 'function') return msg(...args);
			if (!args.length) return msg;

			args.unshift(msg);
			return String(...args);
		}
	}
}

export function register(name: string, value: any) {
	messages.set(name, typeof value === 'function' ? value : String(value));
}
