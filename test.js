const ethers = require("ethers");
const { WSS_ENDPOINT, MY_WALLET } = require("./config/constants");

const network = 97;
const wss_provider = new ethers.providers.WebSocketProvider(
  WSS_ENDPOINT[network]
);

const initMain = async () => {
  const currentBalance = await wss_provider.getBalance(MY_WALLET);
  console.log("CURRENT =>", ethers.utils.formatEther(currentBalance));

  wss_provider.on("pending", async (tx) => {
    wss_provider
      .getTransaction(tx)
      .then(async function (transaction) {
        try {
          if (transaction && transaction.to === MY_WALLET) {
            console.log(
              "value =>",
              ethers.utils.formatEther(transaction.value)
            );
            wss_provider.once(transaction.hash, async (tx) => {
              console.log("from =>", tx.from);
              console.log("tx =>", tx.transactionHash);
              const changedBalance = await wss_provider.getBalance(MY_WALLET);
              console.log(
                "INCREASED =>",
                ethers.utils.formatEther(changedBalance)
              );
            });
          }
        } catch (err) {
          console.log("[ERROR]->wssProvidergetTransaction function");
        }
      })
      .catch((error) => {
        console.log("[ERROR in wssprovider]");
      });
  });
};

module.exports = {
  initMain,
};
