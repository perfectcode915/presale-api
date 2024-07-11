const web3 = require("@solana/web3.js");
const { WALLET_ADDRESS, CHAINS, TEST_MODE } = require("../config/constants");

let currentBalance, signatures;

const chain = TEST_MODE ? CHAINS.testnet.SOL : CHAINS.mainnet.SOL;
const connection = new web3.Connection(
  web3.clusterApiUrl(TEST_MODE ? "devnet" : "mainnet-beta")
);

const publicKey = new web3.PublicKey(WALLET_ADDRESS.SOL);

const solListener = async () => {
  try {
    currentBalance = await connection.getBalance(publicKey);
    console.log(
      chain.id,
      chain.name,
      "=>",
      currentBalance / web3.LAMPORTS_PER_SOL,
      chain.symbol
    );

    connection.onAccountChange(
      publicKey,
      async (accountInfo, context) => {
        if (accountInfo.lamports > currentBalance) {
          currentBalance = accountInfo.lamports;
          console.log(
            "--------------------------------------------------------------------"
          );
          signatures = await connection.getSignaturesForAddress(publicKey, {
            limit: 1,
          });

          if (signatures.length > 0) {
            while (signatures[0].slot !== context.slot) {
              // console.log(signatures[0].slot);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              signatures = await connection.getSignaturesForAddress(publicKey, {
                limit: 1,
              });
            }

            const lastestSignature = signatures[0].signature;
            const tx = await connection.getParsedTransaction(
              lastestSignature,
              "confirmed"
            );
            if (tx && tx.meta) {
              const { preBalances, postBalances } = tx.meta;
              const transfered = postBalances[1] - preBalances[1];
              if (transfered > 0) {
                console.log("ChainID:", chain.id, chain.name);
                console.log("TxHASH =>", lastestSignature);
                console.log(
                  "FROM =>",
                  tx.transaction.message.accountKeys[0].pubkey.toBase58()
                );
                console.log(
                  "VALUE =>",
                  transfered / web3.LAMPORTS_PER_SOL,
                  chain.symbol
                );
              }
            }
          }
        }
      },
      "confirmed"
    );
  } catch (err) {
    console.log("ERR =>", err);
  }
};

module.exports = solListener;
