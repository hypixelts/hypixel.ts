var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/rest/ApiRequest.ts
import { HypixelAPIError } from "./index.mjs";
import { HypixelTSError } from "../errors/index.mjs";
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
export {
  ApiRequest
};
//# sourceMappingURL=ApiRequest.mjs.map