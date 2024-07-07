const ethers = require("ethers");
const { WSS_ENDPOINT, MY_TESTNET_WALLET, tUSDT } = require("./config/constants");
const usdt_abi = require("./abi/bsc-usdt.json");

const network = 97;
const wss_provider = new ethers.providers.WebSocketProvider(
  WSS_ENDPOINT[network]
);

const initTest = async () => {
  try {
    console.log("launched");

    // const address = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";
    const wss_contract_usdt = new ethers.Contract(tUSDT, usdt_abi, wss_provider);
    wss_contract_usdt.on("Transfer", (...args) => {
      console.log("args =>", args);
    });
  } catch (err) {
    console.log("ERR =>", err);
  }
};

module.exports = {
  initTest,
};
