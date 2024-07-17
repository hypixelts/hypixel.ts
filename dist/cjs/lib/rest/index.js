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

// src/lib/rest/index.ts
var rest_exports = {};
__export(rest_exports, {
  ApiRequest: () => ApiRequest,
  HypixelAPIError: () => HypixelAPIError,
  RequestManager: () => RequestManager2
});
module.exports = __toCommonJS(rest_exports);

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
function register(name, value) {
  messages.set(name, typeof value === "function" ? value : String(value));
}
__name(register, "register");

// src/lib/errors/Messages.ts
var messages2 = {
  CLIENT_OPTIONS_MISSING: (option) => `ClientOptions${option ? `.${option}` : ""} ${option ? "is" : "are"} missing`,
  CLIENT_OPTION_INVALID_TYPE: (option, type, received) => `ClientOption.${option} is expected to be of type "${type}", received "${received}"`,
  GET_UUID_ERROR: (error, code) => `Util.getUUID: Failed with error ${error}, status code ${code}`,
  GET_UUID_404: `Util.getUUID: Player not found`,
  GET_USERNAME_ERROR: (error, code) => `Util.getUsername: Failed with error ${error}, status code ${code}`,
  GET_USERNAME_404: `Util.getUsername: Player not found`,
  NOT_UUID: `The supplied string was not of the correct format for a UUID`,
  METHOD_MISSING_OPTION: (manager, method, option) => `${manager}.${method}: Required option "${option}" is missing`,
  METHOD_INVALID_OPTIONS: (manager, method, option, expected) => `${manager}.${method}: Invalid options provided. Expected type "${expected?.length > 1 ? `either ${expected.join(", ")}` : expected.join(", ")}" for the "${option}" option`
};
for (const [key, value] of Object.entries(messages2))
  register(key, value);

// src/lib/rest/ApiRequest.ts
var ApiRequest = class {
  static {
    __name(this, "ApiRequest");
  }
  /**
   * The request manager instance
   */
  requests;
  /**
   * The options of this request
   */
  options;
  constructor(requestManager, options) {
    this.requests = requestManager;
    this.options = options;
  }
  /**
   * Makes a request with the options provided.
   */
  async make() {
    const options = this.buildOptions();
    const res = await fetch(options.url, {
      ...options
    });
    if (!res.ok) {
      const error = await res.json();
      throw new HypixelAPIError(error?.cause ?? res.statusText, res.status);
    }
    return res;
  }
  /**
   * Creates an object containing the options to be passed to the request
   */
  buildOptions() {
    const apiKey = this.requests.client.options?.apiKey;
    const headers = {
      "Content-Type": "application/json"
    };
    if (this.options.sendAPIKey) {
      if (!apiKey)
        throw new HypixelTSError("CLIENT_OPTIONS_MISSING", "apiKey");
      headers["API-Key"] = apiKey;
    }
    const options = {
      url: `${this.requests.baseApiUrl}${this.options.path}`,
      method: this.options.method ?? "GET",
      headers
    };
    return options;
  }
};

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

// src/lib/rest/RequestManager.ts
var import_async_queue = require("@sapphire/async-queue");
var RequestManager2 = class {
  static {
    __name(this, "RequestManager");
  }
  /**
   * The hypixel.ts client instance
   */
  client;
  /**
   * The base url of the hypixel API
   */
  baseApiUrl;
  /**
   * Queue for requests
   * @see {@link https://npmjs.com/@sapphire/async-queue}
   */
  queue;
  constructor(client) {
    this.client = client;
    this.baseApiUrl = client.options?.baseApiUrl ?? "https://api.hypixel.net";
    this.queue = new import_async_queue.AsyncQueue();
  }
  /**
   * Makes the api request and pushes it to the request queue
   * @param path The path/endpoint to make the request to
   * @param sendAPIKey Whether or not to send the apiKey with this request
   */
  async execute(path, sendAPIKey) {
    await this.queue.wait();
    try {
      const request = await new ApiRequest(this, { path, sendAPIKey }).make();
      return request.json();
    } finally {
      this.queue.shift();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiRequest,
  HypixelAPIError,
  RequestManager
});
//# sourceMappingURL=index.js.map