var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/managers/SkyBlockManager.ts
import { BaseManager } from "./BaseManager.mjs";
import { HypixelTSError } from "../errors/index.mjs";
import { SkyBlockProfile, SkyBlockAuction } from "../classes/index.mjs";
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
export {
  SkyBlockManager
};
//# sourceMappingURL=SkyBlockManager.mjs.map