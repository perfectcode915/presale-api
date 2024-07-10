const TronWeb = require("tronweb");
const { WALLET_ADDRESS } = require("../config/constants");

const tronWeb = new TronWeb({
  fullHost: "https://nile.trongrid.io",
  // privateKey: PRIVATE_TRON,
});

const tronListener = async () => {
  const balance = await tronWeb.trx.getBalance(WALLET_ADDRESS.TRON);
  console.log(1001, "TTRON =>", tronWeb.fromSun(balance));

  setInterval(async () => {
    const currentBlock = await tronWeb.trx.getCurrentBlock();
    if (currentBlock && currentBlock.transactions) {
      const transactions = currentBlock.transactions;
      if (transactions.length > 0) {
        for (let i = 0; i < transactions.length; i++) {
          const txInformation =
            transactions[i].raw_data.contract[0].parameter.value;
          if (
            txInformation.amount &&
            txInformation.owner_address &&
            txInformation.to_address &&
            tronWeb.address.fromHex(txInformation.to_address) ===
              WALLET_ADDRESS.TRON
          ) {
            console.log(
              "--------------------------------------------------------------------"
            );
            console.log("TTRON TRX");
            console.log("TxHASH =>", transactions[i].txID);
            console.log(
              "FROM =>",
              tronWeb.address.fromHex(txInformation.owner_address)
            );
            console.log("VALUE =>", tronWeb.fromSun(txInformation.amount));
          }
        }
      }
    }
  }, 3000);
};

module.exports = tronListener;
