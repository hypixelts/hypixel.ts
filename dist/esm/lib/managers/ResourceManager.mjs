var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/managers/ResourceManager.ts
import { BaseManager } from "./BaseManager.mjs";
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
export {
  ResourceManager
};
//# sourceMappingURL=ResourceManager.mjs.map