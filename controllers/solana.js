const web3 = require("@solana/web3.js");
const { WALLET_ADDRESS, CHAINS } = require("../config/constants");

let connections = [],
  connection,
  currentBalance,
  signatures;

for (const chain of CHAINS.SOL) {
  switch (chain.id) {
    case 900:
      connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));
      connections.push(connection);
      break;
    case 901:
      connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      connections.push(connection);
      break;
  }
}

const publicKey = new web3.PublicKey(WALLET_ADDRESS.SOL);

const solListener = async () => {
  for (let i = 0; i < connections.length; i++) {
    try {
      currentBalance = await connections[i].getBalance(publicKey);
      console.log(
        CHAINS.SOL[i].id,
        CHAINS.SOL[i].name,
        "=>",
        currentBalance / web3.LAMPORTS_PER_SOL,
        CHAINS.SOL[i].symbol
      );

      connections[i].onAccountChange(
        publicKey,
        async (accountInfo, context) => {
          if (accountInfo.lamports > currentBalance) {
            currentBalance = accountInfo.lamports;
            console.log(
              "--------------------------------------------------------------------"
            );
            signatures = await connections[i].getSignaturesForAddress(
              publicKey,
              {
                limit: 1,
              }
            );

            if (signatures.length > 0) {
              while (signatures[0].slot !== context.slot) {
                // console.log(signatures[0].slot);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                signatures = await connections[i].getSignaturesForAddress(
                  publicKey,
                  {
                    limit: 1,
                  }
                );
              }

              const lastestSignature = signatures[0].signature;
              const tx = await connections[i].getParsedTransaction(
                lastestSignature,
                "confirmed"
              );
              if (tx && tx.meta) {
                const { preBalances, postBalances } = tx.meta;
                const transfered = postBalances[1] - preBalances[1];
                if (transfered > 0) {
                  console.log("ChainID:", CHAINS.SOL[i].id, CHAINS.SOL[i].name);
                  console.log("TxHASH =>", lastestSignature);
                  console.log(
                    "FROM =>",
                    tx.transaction.message.accountKeys[0].pubkey.toBase58()
                  );
                  console.log(
                    "VALUE =>",
                    transfered / web3.LAMPORTS_PER_SOL,
                    CHAINS.SOL[i].symbol
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
  }
};

module.exports = solListener;
