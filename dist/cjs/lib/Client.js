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

// src/lib/Client.ts
var Client_exports = {};
__export(Client_exports, {
  Client: () => Client
});
module.exports = __toCommonJS(Client_exports);

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

// src/lib/managers/OtherManager.ts
var OtherManager = class extends BaseManager {
  static {
    __name(this, "OtherManager");
  }
  constructor(client) {
    super(client, true);
  }
  /**
   * Fetch all active network boosters
   */
  async fetchActiveNetworkBoosters() {
    const data = await this.makeGetRequest("/boosters");
    return {
      boosters: data.boosters,
      boosterState: data.boosterState
    };
  }
  /**
   * Fetch current player counts across all games
   */
  async fetchCurrentPlayerCounts() {
    const data = await this.makeGetRequest("/counts");
    return {
      playerCount: data.playerCount,
      games: data.games
    };
  }
  /**
   * Fetch current leaderboards
   */
  async fetchCurrentLeaderboards() {
    const data = await this.makeGetRequest("/leaderboards");
    return {
      leaderboards: data.leaderboards
    };
  }
  /**
   * Fetch punishment statistics
   */
  async fetchPunishmentStatistics() {
    const data = await this.makeGetRequest("/punishmentstats");
    return {
      watchdog_lastMinute: data.watchdog_lastMinute,
      staff_rollingDaily: data.staff_rollingDaily,
      watchdog_total: data.watchdog_total,
      watchdog_rollingDaily: data.watchdog_rollingDaily,
      staff_total: data.staff_total
    };
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

// src/lib/classes/SkyBlockMuseum.ts
var SkyBlockMuseum = class extends Base {
  static {
    __name(this, "SkyBlockMuseum");
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

// src/lib/managers/ResourceManager.ts
var ResourceManager = class extends BaseManager {
  static {
    __name(this, "ResourceManager");
  }
  constructor(client) {
    super(client, false);
  }
  /**
   * Fetch information about Hypixel games
   */
  async fetchGameInformation() {
    return this.makeGetRequest("/resources/games");
  }
  /**
   * Fetch all achievements
   */
  async fetchAchievements() {
    return this.makeGetRequest("/resources/achievements");
  }
  /**
   * Fetch all challenges
   */
  async fetchChallenges() {
    return this.makeGetRequest("/resources/challenges");
  }
  /**
   * Fetch all quests
   */
  async fetchQuests() {
    return this.makeGetRequest("/resources/quests");
  }
  /**
   * Fetch all guild achievements
   */
  async fetchGuildAchievements() {
    return this.makeGetRequest("/resources/guilds/achievements");
  }
  /**
   * Fetch all vanity pets
   */
  async fetchVanityPets() {
    return this.makeGetRequest("/resources/vanity/pets");
  }
  /**
   * Fetch all vanity companions
   */
  async fetchVanityCompanions() {
    return this.makeGetRequest("/resources/vanity/companions");
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
   * Fetch a Skyblock profile museum (using a SkyBlock profile uuid). The data returned can differ depending on the players in-game API settings.
   * @param profileUuid The uuid of the SkyBlock profile
   */
  async fetchMuseum(profileUuid) {
    if (!profileUuid)
      throw new HypixelTSError("METHOD_MISSING_OPTION", "SkyBlockManager", "fetchMuseum", "profileUuid");
    const data = await this.makeGetRequest(`/skyblock/museum?profile=${profileUuid}`);
    return new SkyBlockMuseum(this.client, data);
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

// src/lib/rest/ApiRequest.ts
var ApiRequest = class {
  static {
    __name(this, "ApiRequest");
  }
  /**
   * The request manager instance
   */
  requests;
  /**
   * The options of this request
   */
  options;
  constructor(requestManager, options) {
    this.requests = requestManager;
    this.options = options;
  }
  /**
   * Makes a request with the options provided.
   */
  async make() {
    const options = this.buildOptions();
    const res = await fetch(options.url, {
      ...options
    });
    if (!res.ok) {
      const error = await res.json();
      throw new HypixelAPIError(error?.cause ?? res.statusText, res.status);
    }
    return res;
  }
  /**
   * Creates an object containing the options to be passed to the request
   */
  buildOptions() {
    const apiKey = this.requests.client.options?.apiKey;
    const headers = {
      "Content-Type": "application/json"
    };
    if (this.options.sendAPIKey) {
      if (!apiKey)
        throw new HypixelTSError("CLIENT_OPTIONS_MISSING", "apiKey");
      headers["API-Key"] = apiKey;
    }
    const options = {
      url: `${this.requests.baseApiUrl}${this.options.path}`,
      method: this.options.method ?? "GET",
      headers
    };
    return options;
  }
};

// src/lib/rest/HypixelAPIError.ts
var HypixelAPIError = class extends Error {
  static {
    __name(this, "HypixelAPIError");
  }
  code;
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
};

// src/lib/rest/RequestManager.ts
var import_async_queue = require("@sapphire/async-queue");
var RequestManager2 = class {
  static {
    __name(this, "RequestManager");
  }
  /**
   * The hypixel.ts client instance
   */
  client;
  /**
   * The base url of the hypixel API
   */
  baseApiUrl;
  /**
   * Queue for requests
   * @see {@link https://npmjs.com/@sapphire/async-queue}
   */
  queue;
  constructor(client) {
    this.client = client;
    this.baseApiUrl = client.options?.baseApiUrl ?? "https://api.hypixel.net";
    this.queue = new import_async_queue.AsyncQueue();
  }
  /**
   * Makes the api request and pushes it to the request queue
   * @param path The path/endpoint to make the request to
   * @param sendAPIKey Whether or not to send the apiKey with this request
   */
  async execute(path, sendAPIKey) {
    await this.queue.wait();
    try {
      const request = await new ApiRequest(this, { path, sendAPIKey }).make();
      return request.json();
    } finally {
      this.queue.shift();
    }
  }
};

// src/lib/Client.ts
var Client = class {
  static {
    __name(this, "Client");
  }
  options;
  requests;
  players;
  guilds;
  resources;
  others;
  skyblock;
  constructor(options) {
    this.options = options ?? {};
    this.options.baseApiUrl = "https://api.hypixel.net";
  }
  /**
   * Starts the hypixel client (registers all managers)
   * *NOTE*: This method must be called before further usage.
   */
  start() {
    this.registerManagers();
    return this;
  }
  /**
   * Register all the managers
   */
  registerManagers() {
    this.requests = new RequestManager2(this);
    this.players = new PlayerManager(this);
    this.guilds = new GuildManager(this);
    this.resources = new ResourceManager(this);
    this.others = new OtherManager(this);
    this.skyblock = new SkyBlockManager(this);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client
});
//# sourceMappingURL=Client.js.map