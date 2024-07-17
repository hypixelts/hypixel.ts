// src/lib/errors/Messages.ts
import { register } from "./HypixelTSError.mjs";
var messages = {
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
for (const [key, value] of Object.entries(messages))
  register(key, value);
//# sourceMappingURL=Messages.mjs.map