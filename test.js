const ethers = require("ethers");
const { WSS_ENDPOINT, MY_WALLET } = require("./config/constants");

let providers = [];
let provider;

for (const key in WSS_ENDPOINT) {
  for (const value of WSS_ENDPOINT[key]) {
    provider = new ethers.providers.WebSocketProvider(value);
    providers.push(provider);
  }
}

const initMain = async () => {
  for (let i = 0; i < providers.length; i++) {
    try {
      const currentBalance = await providers[i].getBalance(MY_WALLET);
      const currentNetwork = await providers[i].getNetwork();
      console.log(
        currentNetwork.chainId,
        currentNetwork.name,
        "=>",
        ethers.utils.formatEther(currentBalance)
      );

      providers[i].on("block", async (block) => {
        const newBlock = await providers[i].getBlockWithTransactions(block);
        if (newBlock && "transactions" in newBlock) {
          for (const tx of newBlock.transactions) {
            if (tx.to === MY_WALLET) {
              console.log(
                "ChainID:",
                currentNetwork.chainId,
                currentNetwork.name
              );
              console.log("VALUE =>", ethers.utils.formatEther(tx.value));
              console.log("FROM =>", tx.from);
              console.log("TxHASH =>", tx.hash);
            }
          }
        }
      });
    } catch (err) {
      console.log("ERR =>", key, WSS_ENDPOINT[key]);
    }
  }
};

module.exports = {
  initMain,
};
