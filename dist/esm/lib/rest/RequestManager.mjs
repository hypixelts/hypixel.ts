var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/lib/rest/RequestManager.ts
import { AsyncQueue } from "@sapphire/async-queue";
import { ApiRequest } from "./ApiRequest.mjs";
var RequestManager = class {
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
    this.queue = new AsyncQueue();
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
export {
  RequestManager
};
//# sourceMappingURL=RequestManager.mjs.map