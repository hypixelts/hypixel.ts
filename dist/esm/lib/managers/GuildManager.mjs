var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/managers/GuildManager.ts
import { BaseManager } from "./BaseManager.mjs";
import { HypixelTSError } from "../errors/HypixelTSError.mjs";
import { Guild } from "../classes/Guild.mjs";
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
export {
  GuildManager
};
//# sourceMappingURL=GuildManager.mjs.map