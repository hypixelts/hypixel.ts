var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/classes/Guild.ts
import { Base } from "./Base.mjs";
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
export {
  Guild
};
//# sourceMappingURL=Guild.mjs.map