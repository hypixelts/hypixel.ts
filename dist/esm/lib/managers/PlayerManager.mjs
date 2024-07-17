var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/managers/PlayerManager.ts
import { BaseManager } from "./BaseManager.mjs";
import { Player, Util } from "../classes/index.mjs";
import { HypixelTSError } from "../errors/index.mjs";
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
export {
  PlayerManager
};
//# sourceMappingURL=PlayerManager.mjs.map