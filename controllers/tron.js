const TronWeb = require("tronweb");
const { MY_WALLET_TRON, PRIVATE_TRON } = require("../config/constants");

const tronWeb = new TronWeb({
  fullHost: "https://nile.trongrid.io",
  privateKey: PRIVATE_TRON,
});

const tronListener = async () => {
  const balance = await tronWeb.trx.getBalance(MY_WALLET_TRON);
  console.log(1001, "TTRON =>", tronWeb.fromSun(balance));
  const transactions = await tronWeb.trx.getTransactionsRelated(
    MY_WALLET_TRON,
    "to"
  );
  console.log(transactions);
};

tronListener();
