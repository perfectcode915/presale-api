const ethListener = require("./controllers/ethereum");
const solListener = require("./controllers/solana");
const tronListener = require("./controllers/tron");

console.log(
  "------------------------- CURRENT BALANCES -------------------------"
);

ethListener();

solListener();

tronListener();
