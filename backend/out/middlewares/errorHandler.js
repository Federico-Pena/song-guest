import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// backend/src/middlewares/errorHandler.ts
var errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};
export {
  errorHandler
};
