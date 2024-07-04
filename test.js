const ethers = require("ethers");
const { WSS_ENDPOINT, MY_WALLET } = require("./config/constants");
// const { formatEther } = require("viem");
// const { bscTestnet } = require("viem/chains");

const network = 97;
const wss_provider = new ethers.providers.WebSocketProvider(
  WSS_ENDPOINT[network]
);

const initMain = async () => {
  console.log("launched");
  wss_provider.on("pending", async (tx) => {
    // if (true) {
    wss_provider
      .getTransaction(tx)
      .then(async function (transaction) {
        try {
          // console.log({ from: transaction.from, to: transaction.to });
          if (transaction && transaction.to === MY_WALLET) {
            // console.log({ transaction });
            // console.log("ethers.utils.hexlify =>", String(transaction.value));
            console.log(
              "value =>",
              ethers.utils.formatEther(transaction.value)
            );
            wss_provider.once(transaction.hash, (tx) => {
              console.log("mined tx =>", tx);
            });
          }
        } catch (err) {
          console.log("[ERROR]->wssProvidergetTransaction function");
        }
      })
      .catch((error) => {
        console.log("[ERROR in wssprovider]");
      });
    // }
  });
  // wss_provider.once(txHash, (transaction) => {
  //   console.log("mined tx =>", transaction);
  // });
  // filter = {
  //   address: "",
  //   topics: [ethers.utils.id("Transfer(address,address,uint256)")],
  // };
  // wss_provider.on(filter, (log, event) => {
  //   // Emitted whenever a DAI token transfer occurs
  //   console.log({ log, event });
  // });
};

module.exports = {
  initMain,
};
