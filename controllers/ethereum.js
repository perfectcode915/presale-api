const ethers = require("ethers");
const { CHAINS, WALLET_ADDRESS } = require("../config/constants");

let providers = [];
let provider;
let contracts = [];
let newContract;
let contractInfo = [];

for (const chain of CHAINS.EVM) {
  provider = new ethers.providers.WebSocketProvider(chain.endpoint);
  providers.push(provider);
  if (chain.contracts.length > 0) {
    for (const contract of chain.contracts) {
      newContract = new ethers.Contract(
        contract.address,
        contract.abi,
        provider
      );
      contracts.push(newContract);
      contractInfo.push({
        chainId: chain.id,
        chainName: chain.name,
        contractName: contract.name,
      });
    }
  }
}

const ethListener = async () => {
  for (let i = 0; i < providers.length; i++) {
    try {
      const currentBalance = await providers[i].getBalance(WALLET_ADDRESS.EVM);
      console.log(
        CHAINS.EVM[i].id,
        CHAINS.EVM[i].name,
        "=>",
        ethers.utils.formatEther(currentBalance),
        CHAINS.EVM[i].symbol
      );

      providers[i].on("block", async (block) => {
        const newBlock = await providers[i].getBlockWithTransactions(block);
        if (newBlock && "transactions" in newBlock) {
          for (const tx of newBlock.transactions) {
            if (tx.to === WALLET_ADDRESS.EVM) {
              console.log(
                "--------------------------------------------------------------------"
              );
              console.log("ChainID:", CHAINS.EVM[i].id, CHAINS.EVM[i].name);
              console.log("TxHASH =>", tx.hash);
              console.log("FROM =>", tx.from);
              console.log(
                "VALUE =>",
                ethers.utils.formatEther(tx.value),
                CHAINS.EVM[i].symbol
              );
            }
          }
        }
      });
    } catch (err) {
      console.log("ERR =>", err);
    }
  }

  for (let i = 0; i < contracts.length; i++) {
    const currentContractBalance = await contracts[i].balanceOf(
      WALLET_ADDRESS.EVM
    );
    console.log(
      "ChainID",
      contractInfo[i].chainId,
      contractInfo[i].chainName,
      "=>",
      ethers.utils.formatEther(currentContractBalance),
      contractInfo[i].contractName
    );
    contracts[i].on("Transfer", (from, to, value, event) => {
      if (to === WALLET_ADDRESS.EVM) {
        console.log(
          "--------------------------------------------------------------------"
        );
        console.log(contractInfo[i].chainId, contractInfo[i].contractName);
        console.log("TxHASH =>", event.transactionHash);
        console.log("FROM =>", from);
        console.log(
          "VALUE =>",
          ethers.utils.formatEther(value),
          contractInfo[i].contractName
        );
      }
    });
  }
};

module.exports = ethListener;
