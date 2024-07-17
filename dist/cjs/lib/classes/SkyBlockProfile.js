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

// src/lib/classes/SkyBlockProfile.ts
var SkyBlockProfile_exports = {};
__export(SkyBlockProfile_exports, {
  SkyBlockProfile: () => SkyBlockProfile
});
module.exports = __toCommonJS(SkyBlockProfile_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SkyBlockProfile
});
//# sourceMappingURL=SkyBlockProfile.js.map