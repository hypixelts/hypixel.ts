var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/classes/Util.ts
import { Base } from "./Base.mjs";
import { HypixelTSError } from "../errors/HypixelTSError.mjs";
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
export {
  Util
};
//# sourceMappingURL=Util.mjs.map