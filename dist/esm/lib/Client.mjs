var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/Client.ts
import { PlayerManager, GuildManager, ResourceManager, OtherManager, SkyBlockManager } from "./managers/index.mjs";
import { RequestManager } from "./rest/index.mjs";
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
    this.requests = new RequestManager(this);
    this.players = new PlayerManager(this);
    this.guilds = new GuildManager(this);
    this.resources = new ResourceManager(this);
    this.others = new OtherManager(this);
    this.skyblock = new SkyBlockManager(this);
  }
};
export {
  Client
};
//# sourceMappingURL=Client.mjs.map