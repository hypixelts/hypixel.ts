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

// src/lib/classes/index.ts
var classes_exports = {};
__export(classes_exports, {
  Base: () => Base,
  Guild: () => Guild,
  Player: () => Player,
  SkyBlockAuction: () => SkyBlockAuction,
  SkyBlockMuseum: () => SkyBlockMuseum,
  SkyBlockProfile: () => SkyBlockProfile,
  Util: () => Util
});
module.exports = __toCommonJS(classes_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Base,
  Guild,
  Player,
  SkyBlockAuction,
  SkyBlockMuseum,
  SkyBlockProfile,
  Util
});
//# sourceMappingURL=index.js.map