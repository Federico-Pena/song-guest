import { createRequire } from "node:module"; const require = createRequire(import.meta.url);

// backend/src/middlewares/logger.ts
var logger = (staticFiles) => {
  return (req, res, next) => {
    const isStatic = req.url.match(
      /\.(css|js|png|jpg|jpeg|ico|svg|woff|woff2|ttf|eot|mp4|webm|gif)$/
    );
    if (!staticFiles && isStatic) {
      return next();
    }
    const date = /* @__PURE__ */ new Date();
    const methodColor = setColorMethod(req.method);
    const dayTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const message = `${dayTime} --> ${setColorText(methodColor, req.method)} statusCode`;
    res.on("finish", () => {
      const statusCodeColor = setColorStatusCode(res.statusCode);
      const url = `${req.protocol}://${req.get("host")}${req.originalUrl || req.url}`;
      const finalMessage = message.replace(
        "statusCode",
        `| ${setColorText(statusCodeColor, `${res.statusCode}`)} | ${isStatic ? setColorText(colors.black, url) : setColorText(statusCodeColor, url)}`
      );
      console.log(finalMessage);
      console.log("\r");
    });
    next();
  };
};
var setColorText = (color, text) => `${color}${text}${colors.reset}`;
var setColorStatusCode = (statusCode) => {
  if (statusCode >= 500) {
    return colors.red;
  } else if (statusCode >= 400) {
    return colors.yellow;
  } else if (statusCode >= 300) {
    return colors.cyan;
  } else if (statusCode >= 200) {
    return colors.green;
  } else {
    return colors.white;
  }
};
var setColorMethod = (method) => {
  if (method === "GET") {
    return colors.blue;
  } else if (method === "POST") {
    return colors.magenta;
  } else if (method === "PUT") {
    return colors.cyan;
  } else if (method === "DELETE") {
    return colors.red;
  } else {
    return colors.white;
  }
};
var colors = {
  reset: "\x1B[0m",
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m"
};
export {
  colors,
  logger,
  setColorMethod,
  setColorStatusCode,
  setColorText
};
