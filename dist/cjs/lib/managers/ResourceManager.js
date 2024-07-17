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

// src/lib/managers/ResourceManager.ts
var ResourceManager_exports = {};
__export(ResourceManager_exports, {
  ResourceManager: () => ResourceManager
});
module.exports = __toCommonJS(ResourceManager_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResourceManager
});
//# sourceMappingURL=ResourceManager.js.map