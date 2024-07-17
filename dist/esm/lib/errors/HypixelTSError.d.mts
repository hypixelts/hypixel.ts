declare class HypixelTSError extends Error {
    constructor(key: string, ...args: any[]);
}
declare function register(name: string, value: any): void;

export { HypixelTSError, register };
