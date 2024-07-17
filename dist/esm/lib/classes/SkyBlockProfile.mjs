var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/classes/SkyBlockProfile.ts
import { Base } from "./Base.mjs";
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
export {
  SkyBlockProfile
};
//# sourceMappingURL=SkyBlockProfile.mjs.map