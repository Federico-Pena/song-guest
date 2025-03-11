import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// backend/src/error/Error.ts
var ErrorSocket = class extends Error {
  message;
  constructor(message, name) {
    super(message);
    this.message = message;
    const error = new Error(message);
    error.name = name || "ErrorSocket";
    return error;
  }
};
export {
  ErrorSocket
};
