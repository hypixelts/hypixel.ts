var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/classes/SkyBlockAuction.ts
import { Base } from "./Base.mjs";
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
export {
  SkyBlockAuction
};
//# sourceMappingURL=SkyBlockAuction.mjs.map