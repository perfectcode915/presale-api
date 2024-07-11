const TronWeb = require("tronweb");
const { WALLET_ADDRESS, CHAINS, TRON_TEST } = require("../config/constants");

const param = TRON_TEST ? 1 : 0;
const tronWeb = new TronWeb({
  fullHost: CHAINS.TRON[param].endpoint,
});

tronWeb.setAddress(WALLET_ADDRESS.TRON);

const tronListener = async () => {
  try {
    const balance = await tronWeb.trx.getBalance(WALLET_ADDRESS.TRON);
    console.log(
      CHAINS.TRON[param].id,
      CHAINS.TRON[param].name,
      "=>",
      tronWeb.fromSun(balance),
      CHAINS.TRON[param].symbol
    );

    let contract;
    for (const c of CHAINS.TRON[param].contracts) {
      contract = await tronWeb.contract(c.abi, c.address);
      const contractBalance = await contract
        .balanceOf(WALLET_ADDRESS.TRON)
        .call();
      console.log(
        CHAINS.TRON[param].id,
        CHAINS.TRON[param].name,
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
              console.log(
                "ChainID:",
                CHAINS.TRON[param].id,
                CHAINS.TRON[param].name
              );
              console.log("TxHASH =>", transactions[i].txID);
              console.log(
                "FROM =>",
                tronWeb.address.fromHex(txInformation.owner_address)
              );
              console.log(
                "VALUE =>",
                tronWeb.fromSun(txInformation.amount),
                CHAINS.TRON[param].symbol
              );
            } else if (
              txInformation.owner_address &&
              txInformation.contract_address &&
              txInformation.data
            ) {
              for (let j = 0; j < CHAINS.TRON[param].contracts.length; j++) {
                if (
                  tronWeb.address.fromHex(txInformation.contract_address) ===
                    CHAINS.TRON[param].contracts[j].address &&
                  txInformation.data.substring(0, 8) === "a9059cbb" &&
                  tronWeb.address.fromHex(
                    "41" + txInformation.data.substring(32, 72)
                  ) === WALLET_ADDRESS.TRON
                ) {
                  console.log(
                    "--------------------------------------------------------------------"
                  );
                  console.log(
                    "ChainID:",
                    CHAINS.TRON[param].id,
                    CHAINS.TRON[param].contracts[j].name
                  );
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
                    CHAINS.TRON[param].contracts[j].name
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
