const { initMain } = require("./main");
const { initTest } = require("./test");

if (process.env.NETWORK_MODE == "testnet") {
  initTest();
} else {
  initMain();
}
