// Use CommonJS requires below so we can dynamically import during build time
if (process.env.NODE_ENV === "production") {
  module.exports = require(".configureStore.prod");
} else {
  module.exprots = require("./configureStore.dev");
}
