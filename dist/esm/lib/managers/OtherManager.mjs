var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/managers/OtherManager.ts
import { BaseManager } from "./BaseManager.mjs";
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
export {
  OtherManager
};
//# sourceMappingURL=OtherManager.mjs.map