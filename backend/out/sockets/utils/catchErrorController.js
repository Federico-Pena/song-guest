import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// backend/src/sockets/utils/catchErrorController.ts
var catchErrorController = (name, error) => {
  console.error(name, error.message);
};
export {
  catchErrorController
};
