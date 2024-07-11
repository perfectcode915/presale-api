const TronWeb = require("tronweb");
const { WALLET_ADDRESS, CHAINS, TEST_MODE } = require("../config/constants");

const chain = TEST_MODE ? CHAINS.testnet.TRON : CHAINS.mainnet.TRON;
const tronWeb = new TronWeb({
  fullHost: chain.endpoint,
});

tronWeb.setAddress(WALLET_ADDRESS.TRON);

const tronListener = async () => {
  try {
    const balance = await tronWeb.trx.getBalance(WALLET_ADDRESS.TRON);
    console.log(
      chain.id,
      chain.name,
      "=>",
      tronWeb.fromSun(balance),
      chain.symbol
    );

    let contract;
    for (const c of chain.contracts) {
      contract = await tronWeb.contract(c.abi, c.address);
      const contractBalance = await contract
        .balanceOf(WALLET_ADDRESS.TRON)
        .call();
      console.log(
        chain.id,
        chain.name,
        "=>",
        tronWeb.fromSun(contractBalance.toString()),
        c.name
      );
    }

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
              console.log("ChainID:", chain.id, chain.name);
              console.log("TxHASH =>", transactions[i].txID);
              console.log(
                "FROM =>",
                tronWeb.address.fromHex(txInformation.owner_address)
              );
              console.log(
                "VALUE =>",
                tronWeb.fromSun(txInformation.amount),
                chain.symbol
              );
            } else if (
              txInformation.owner_address &&
              txInformation.contract_address &&
              txInformation.data
            ) {
              for (let j = 0; j < chain.contracts.length; j++) {
                if (
                  tronWeb.address.fromHex(txInformation.contract_address) ===
                    chain.contracts[j].address &&
                  txInformation.data.substring(0, 8) === "a9059cbb" &&
                  tronWeb.address.fromHex(
                    "41" + txInformation.data.substring(32, 72)
                  ) === WALLET_ADDRESS.TRON
                ) {
                  console.log(
                    "--------------------------------------------------------------------"
                  );
                  console.log("ChainID:", chain.id, chain.contracts[j].name);
                  console.log("TxHASH =>", transactions[i].txID);
                  console.log(
                    "FROM =>",
                    tronWeb.address.fromHex(txInformation.owner_address)
                  );
                  console.log(
                    "VALUE =>",
                    tronWeb.fromSun(
                      tronWeb
                        .toBigNumber("0x" + txInformation.data.substring(72))
                        .toNumber()
                    ),
                    chain.contracts[j].name
                  );
                  break;
                }
              }
            }
          }
        }
      }
    }, 3000);
  } catch (err) {
    console.log("err =>", err);
  }
};

module.exports = tronListener;
