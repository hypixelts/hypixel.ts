var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/rest/HypixelAPIError.ts
var HypixelAPIError = class extends Error {
  static {
    __name(this, "HypixelAPIError");
  }
  code;
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
};
export {
  HypixelAPIError
};
//# sourceMappingURL=HypixelAPIError.mjs.map