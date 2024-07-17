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

// src/lib/managers/SkyBlockManager.ts
var SkyBlockManager_exports = {};
__export(SkyBlockManager_exports, {
  SkyBlockManager: () => SkyBlockManager
});
module.exports = __toCommonJS(SkyBlockManager_exports);

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
function register(name, value) {
  messages.set(name, typeof value === "function" ? value : String(value));
}
__name(register, "register");

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

// src/lib/classes/SkyBlockAuction.ts
var SkyBlockAuction = class extends Base {
  static {
    __name(this, "SkyBlockAuction");
  }
  /**
   * @param client Instantiated (and started) hypixel.ts client
   * @param data SkyBlock auction data received from API
   */
  constructor(client, data) {
    super(client);
    if ("_id" in data)
      data.id = data._id;
    Object.assign(this, data);
  }
};

// src/lib/classes/SkyBlockProfile.ts
var SkyBlockProfile = class extends Base {
  static {
    __name(this, "SkyBlockProfile");
  }
  /**
   * @param client Instantiated (and started) hypixel.ts client
   * @param data SkyBlock profile data received from API
   */
  constructor(client, data) {
    super(client);
    Object.assign(this, data);
  }
};

// src/lib/managers/SkyBlockManager.ts
var SkyBlockManager = class extends BaseManager {
  static {
    __name(this, "SkyBlockManager");
  }
  constructor(client) {
    super(client, true);
  }
  /**
   * Fetch information regarding collections in the SkyBlock game
   */
  async fetchCollections() {
    const data = await this.makeGetRequest("/resources/skyblock/collections");
    return {
      lastUpdated: data.lastUpdated,
      version: data.version,
      collections: data.collections
    };
  }
  /**
   * Fetch information regarding skills in the SkyBlock game
   */
  async fetchSkills() {
    const data = await this.makeGetRequest("/resources/skyblock/skills");
    return {
      lastUpdated: data.lastUpdated,
      version: data.version,
      collections: data.collections,
      skills: data.skills
    };
  }
  /**
   * Fetch information regarding items in the SkyBlock game
   */
  async fetchItems() {
    const data = await this.makeGetRequest("/resources/skyblock/items");
    return {
      lastUpdated: data.lastUpdated,
      items: data.items
    };
  }
  /**
   * Fetch information regarding the current mayor and ongoing election in SkyBlock
   */
  async fetchElectionAndMayor() {
    const data = await this.makeGetRequest("/resources/skyblock/election");
    return {
      lastUpdated: data.lastUpdated,
      mayor: data.mayor,
      current: data.current
    };
  }
  /**
   * Fetch information regarding the current bingo event and its goals
   */
  async fetchActiveBingoGoals() {
    const data = await this.makeGetRequest("/resources/skyblock/bingo");
    return {
      lastUpdated: data.lastUpdated,
      id: data.id,
      goals: data.goals
    };
  }
  /**
   * Fetch SkyBlock news
   */
  async fetchNews() {
    const data = await this.makeGetRequest("/skyblock/news");
    return {
      items: data.items
    };
  }
  /**
   * Fetch a SkyBlock auction.
   * @param identifier The idenitifer you're using to fetch the auction
   * @param type The type of identifier you're passing (either auction `uuid`, uuid of the `player`, uuid of the `profile`)
   * @param raw Whether to return the raw response, without converting each auction to an @see{@link SkyBlockAuction} class. Defaults to `false`.
   */
  async fetchAuction(identifier, type, raw = false) {
    if (!identifier)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchAuction", "identifier");
    if (!type)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchAuction", "type");
    if (type !== "uuid" && type !== "player" && type !== "profile")
      throw new HypixelTSError("METHOD_INVALID_OPTIONS", "SkyBlockManager", "fetchAuction", "type", ["uuid", "player", "profile"]);
    const { auctions } = await this.makeGetRequest(`/skyblock/auction?${type}=${identifier}`);
    if (!raw) {
      const parsed = [];
      for (const auction of auctions) {
        parsed.push(new SkyBlockAuction(this.client, auction));
      }
      return parsed;
    }
    return auctions;
  }
  /**
   * Fetch the currently active auctions (sorted by last updated first and paginated)
   * @param page The page number
   * @param resolveAuctions Whether to resolve the auctions returned, to a @see {@link SkyBlockAuction} class. Defaults to `true`.
   */
  async fetchActiveAuctions(page, resolveAuctions = true) {
    if (page && typeof page !== "number")
      throw new HypixelTSError("METHOD_INVALID_OPTIONS", "SkyBlockManager", "fetchActiveAuctions", "page", ["number"]);
    const data = await this.makeGetRequest(`/skyblock/auctions${page ? "?page=" + page : ""}`);
    if (resolveAuctions) {
      const parsed = [];
      for (const auction of data.auctions) {
        parsed.push(new SkyBlockAuction(this.client, auction));
      }
      return {
        lastUpdated: data.lastUpdated,
        page: data.page,
        totalPages: data.totalPages,
        totalAuctions: data.totalAuctions,
        auctions: parsed
      };
    }
    return {
      lastUpdated: data.lastUpdated,
      page: data.page,
      totalPages: data.totalPages,
      totalAuctions: data.totalAuctions,
      auctions: data.auctions
    };
  }
  /**
   * Fetch recently ended auctions (auctions which ended in the last 60 seconds).
   */
  async fetchRecentlyEndedAuctions() {
    const data = await this.makeGetRequest("/skyblock/auctions_ended");
    return {
      lastUpdated: data.lastUpdated,
      auctions: data.auctions
    };
  }
  /**
   * Fetch bazaar items
   */
  async fetchBazaar() {
    const data = await this.makeGetRequest("/skyblock/bazaar");
    return {
      lastUpdated: data.lastUpdated,
      products: data.products
    };
  }
  /**
   * Fetch a SkyBlock profile (using a SkyBlock profile uuid). The data returned can differ depending on the players in-game API settings.
   * @param profileUuid The uuid of the SkyBlock profile
   */
  async fetchProfile(profileUuid) {
    if (!profileUuid)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchProfile", "profileUuid");
    const data = await this.makeGetRequest(`/skyblock/profile?profile=${profileUuid}`);
    return new SkyBlockProfile(this.client, data);
  }
  /**
   * Fetch a SkyBlock profiles of a player
   * @param playerUuid The uuid of the player
   */
  async fetchPlayerSkyBlockProfiles(playerUuid) {
    if (!playerUuid)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchPlayerSkyBlockProfiles", "playerUuid");
    const { profiles } = await this.makeGetRequest(`/skyblock/profiles?uuid=${playerUuid}`);
    const parsed = [];
    for (const profile of profiles) {
      parsed.push(new SkyBlockProfile(this.client, profile));
    }
    return parsed;
  }
  /**
   * Fetch bingo data of a player
   * @param playerUuid The uuid of the player
   */
  async fetchBingoData(playerUuid) {
    if (!playerUuid)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchBingoData", "playerUuid");
    const data = await this.makeGetRequest(`/skyblock/bingo?uuid=${playerUuid}`);
    return {
      events: data.events
    };
  }
  /**
   * Fetch the currently active or upcoming Fire Sales for SkyBlock
   */
  async fetchFireSales() {
    const { sales } = await this.makeGetRequest("/skyblock/firesales");
    return sales;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SkyBlockManager
});
//# sourceMappingURL=SkyBlockManager.js.map