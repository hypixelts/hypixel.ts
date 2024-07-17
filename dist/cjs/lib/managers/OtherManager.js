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

// src/lib/managers/OtherManager.ts
var OtherManager_exports = {};
__export(OtherManager_exports, {
  OtherManager: () => OtherManager
});
module.exports = __toCommonJS(OtherManager_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OtherManager
});
//# sourceMappingURL=OtherManager.js.map