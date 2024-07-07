const ethers = require("ethers");
const { WSS_ENDPOINT, MY_WALLET } = require("./config/constants");
const abi = require("./abi/bsc-usdt.json");

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

      // if (i === 7) {
      //   const address = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
      //   const contract = new ethers.Contract(address, abi, providers[i]);
      //   contract.on("Transfer", (from, to, value, event) => {
      //     console.log({
      //       from: from,
      //       to: to,
      //       value: value.toString(),
      //       data: event,
      //     });
      //   });
      // }
    } catch (err) {
      console.log("ERR =>", err);
    }
  }
};

module.exports = {
  initMain,
};
