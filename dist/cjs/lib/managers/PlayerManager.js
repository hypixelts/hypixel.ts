"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/managers/PlayerManager.ts
var PlayerManager_exports = {};
__export(PlayerManager_exports, {
  PlayerManager: () => PlayerManager
});
module.exports = __toCommonJS(PlayerManager_exports);

// src/lib/managers/BaseManager.ts
var BaseManager = class {
  static {
    __name(this, "BaseManager");
  }
  /**
   * Whether or not the manager requires API key authorization.
   */
  requiresAuth;
  /**
   * The instantiated hypixel.ts client
   */
  client;
  constructor(client, requiresAuth) {
    this.client = client;
    this.requiresAuth = requiresAuth;
  }
  /**
   * Calls the request manager to create (and execute) requests to the API.
   *
   * **NOTE**: Do not directly use this method unless you know what you are doing. Consider using the methods provided in the managers.
   * @param path The path/endpoint of the request
   * @private
   */
  async makeGetRequest(path) {
    return this.client.requests.execute(path, this.requiresAuth);
  }
};

// src/lib/classes/Base.ts
var Base = class {
  static {
    __name(this, "Base");
  }
  /**
   * The instantiated hypixel.ts client.
   */
  client;
  constructor(client) {
    this.client = client;
  }
};

// src/lib/classes/Player.ts
var Player = class extends Base {
  static {
    __name(this, "Player");
  }
  /**
   * @param client Instantiated (and started) hypixel.ts client
   * @param data Player data received from API
   */
  constructor(client, data) {
    super(client);
    Object.assign(this, data);
  }
  /**
   * Fetch the SkyBlock profiles of this player
   * @see {@link SkyBlockManager.fetchPlayerSkyBlockProfiles}
   */
  async fetchSkyBlockProfiles() {
    return this.client.skyblock.fetchPlayerSkyBlockProfiles(this.uuid);
  }
};

// src/lib/errors/HypixelTSError.ts
var messages = /* @__PURE__ */ new Map();
var HypixelTSError = class extends Error {
  static {
    __name(this, "HypixelTSError");
  }
  constructor(key, ...args) {
    super(getMessage(key, args));
    function getMessage(key2, args2) {
      if (typeof key2 !== "string")
        throw new Error("[getMessage]: argument key must be a string");
      const msg = messages.get(key2);
      if (!msg)
        throw new Error(`[getMessage]: An invalid error key was provided: ${key2}`);
      if (typeof msg === "function")
        return msg(...args2);
      if (!args2.length)
        return msg;
      args2.unshift(msg);
      return String(...args2);
    }
    __name(getMessage, "getMessage");
  }
};
function register(name, value) {
  messages.set(name, typeof value === "function" ? value : String(value));
}
__name(register, "register");

// src/lib/classes/Util.ts
var Util = class extends Base {
  static {
    __name(this, "Util");
  }
  /**
   * Get the UUID of a player by providing their name
   * @param name The name of the player
   */
  static async getUUID(name) {
    try {
      const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
      const json = await data.json();
      if (json.errorMessage)
        throw new HypixelTSError("GET_UUID_ERROR", json.errorMessage, data.status);
      return json.id;
    } catch {
      throw new HypixelTSError("GET_UUID_404");
    }
  }
  /**
   * Get player's name from their UUID
   * @param uuid The uuid of the player
   */
  static async getUsername(uuid) {
    if (!this.isUUID(uuid)) {
      throw new HypixelTSError("NOT_UUID");
    }
    try {
      const data = await fetch(`https://api.mojang.com/user/profile/${uuid}`);
      const json = await data.json();
      if (json.errorMessage)
        throw new HypixelTSError("GET_USERNAME_ERROR", json.errorMessage, data.status);
      return json.name;
    } catch {
      throw new HypixelTSError("GET_USERNAME_404");
    }
  }
  /**
   * Check whether the provided UUID is a valid UUID or not
   * @param uuid The UUID to check
   */
  static isUUID(uuid) {
    const regexStripped = /^[0-9a-f]{32}$/i;
    const regexFull = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/i;
    return regexStripped.test(uuid) || regexFull.test(uuid);
  }
};

// src/lib/errors/Messages.ts
var messages2 = {
  CLIENT_OPTIONS_MISSING: (option) => `ClientOptions${option ? `.${option}` : ""} ${option ? "is" : "are"} missing`,
  CLIENT_OPTION_INVALID_TYPE: (option, type, received) => `ClientOption.${option} is expected to be of type "${type}", received "${received}"`,
  GET_UUID_ERROR: (error, code) => `Util.getUUID: Failed with error ${error}, status code ${code}`,
  GET_UUID_404: `Util.getUUID: Player not found`,
  GET_USERNAME_ERROR: (error, code) => `Util.getUsername: Failed with error ${error}, status code ${code}`,
  GET_USERNAME_404: `Util.getUsername: Player not found`,
  NOT_UUID: `The supplied string was not of the correct format for a UUID`,
  METHOD_MISSING_OPTION: (manager, method, option) => `${manager}.${method}: Required option "${option}" is missing`,
  METHOD_INVALID_OPTIONS: (manager, method, option, expected) => `${manager}.${method}: Invalid options provided. Expected type "${expected?.length > 1 ? `either ${expected.join(", ")}` : expected.join(", ")}" for the "${option}" option`
};
for (const [key, value] of Object.entries(messages2))
  register(key, value);

// src/lib/managers/PlayerManager.ts
var PlayerManager = class extends BaseManager {
  static {
    __name(this, "PlayerManager");
  }
  constructor(client) {
    super(client, true);
  }
  /**
   * Fetch a player using their username or uuid
   * @param identifier The username/uuid of the player
   */
  async fetch(identifier) {
    if (!identifier)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "PlayerManager", "fetch", "identifier");
    const uuid = await this.getUUID(identifier);
    const { player } = await this.makeGetRequest(`/player?uuid=${uuid}`);
    return new Player(this.client, player);
  }
  /**
   * Fetch the recently played games of a player
   * @param identifier The username/uuid of the player
   */
  async getRecentlyPlayedGames(identifier) {
    if (!identifier)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "PlayerManager", "getRecentlyPlayedGames", "identifier");
    const uuid = await this.getUUID(identifier);
    const { games } = await this.makeGetRequest(`/recentgames?uuid=${uuid}`);
    return games;
  }
  /**
   * Fetch the status of a player
   * @param identifier The username/uuid of the player
   */
  async getStatus(identifier) {
    if (!identifier)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "PlayerManager", "getStatus", "identifier");
    const uuid = await this.getUUID(identifier);
    const { session } = await this.makeGetRequest(`/status?uuid=${uuid}`);
    return session;
  }
  /**
   * Resolves the username to a uuid for use in requests
   * @param identifier The username (or uuid) of the player
   */
  async getUUID(identifier) {
    const isUUID = Util.isUUID(identifier);
    if (!isUUID) {
      const uuid = await Util.getUUID(identifier);
      return uuid;
    }
    return identifier;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PlayerManager
});
//# sourceMappingURL=PlayerManager.js.map