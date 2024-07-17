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

// src/lib/managers/GuildManager.ts
var GuildManager_exports = {};
__export(GuildManager_exports, {
  GuildManager: () => GuildManager
});
module.exports = __toCommonJS(GuildManager_exports);

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

// src/lib/classes/Guild.ts
var Guild = class extends Base {
  static {
    __name(this, "Guild");
  }
  /**
   * @param client Instantiated (and started) hypixel.ts client
   * @param data Guild data received from API
   */
  constructor(client, data) {
    super(client);
    data.id = data._id;
    Object.assign(this, data);
  }
};

// src/lib/managers/GuildManager.ts
var GuildManager = class extends BaseManager {
  static {
    __name(this, "GuildManager");
  }
  constructor(client) {
    super(client, true);
  }
  /**
   * Fetch a guild by the guild id, or its name, or a player's guild by providing their uuid
   * @param identifier The id/name of the guild or the uuid of the player
   * @param type The type of identifier you're passing (id/name of guild, player uuid)
   */
  async fetch(identifier, type) {
    if (!identifier)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "GuildManager", "fetch", "identifier");
    if (!type)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "GuildManager", "fetch", "type");
    if (type !== "id" && type !== "name" && type !== "player")
      throw new HypixelTSError("METHOD_INVALID_OPTIONS", "GuildManager", "fetch", "type", ["id", "name", "player"]);
    const { guild } = await this.makeGetRequest(`/guild?${type}=${identifier}`);
    return guild ? new Guild(this.client, guild) : null;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GuildManager
});
//# sourceMappingURL=GuildManager.js.map