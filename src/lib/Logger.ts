export class Logger {
	public readonly mode: 'debug' | 'trace' | null;

	public constructor(mode: 'debug' | 'trace' | null = null) {
		this.mode = mode;
	}

	/**
	 * Logs a debug message to the console.
	 * @param message The message to log
	 * @param args Further arguments
	 */
	public debug(message: string, ...args: any[]) {
		if (this.mode === 'debug' || this.mode === 'trace') {
			console.log(`[hypixel.ts DEBUG] ${message}`, ...args);
		}
	}

	/**
	 * Logs a trace message to the console.
	 * @param message The message to log
	 * @param args Further arguments
	 */
	public trace(message: string, ...args: any[]) {
		if (this.mode === 'trace') {
			console.log(`[hypixel.ts TRACE] ${message}`, ...args);
		}
	}
}
