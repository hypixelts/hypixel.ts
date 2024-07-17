var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/classes/Player.ts
import { Base } from "./Base.mjs";
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
export {
  Player
};
//# sourceMappingURL=Player.mjs.map