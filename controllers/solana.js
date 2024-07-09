const web3 = require("@solana/web3.js");
const { MY_WALLET_SOL } = require("../config/constants");

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const publicKey = new web3.PublicKey(MY_WALLET_SOL);

const solListener = async () => {
  try {
    const currentBalance = await connection.getBalance(publicKey);
    console.log(901, "SolanaDevnet =>", currentBalance / web3.LAMPORTS_PER_SOL);

    connection.onAccountChange(
      publicKey,
      async (accountInfo, context) => {
        if (accountInfo.lamports > currentBalance) {
          console.log(
            "--------------------------------------------------------------------"
          );
          console.log(
            "CHANGED TO =>",
            accountInfo.lamports / web3.LAMPORTS_PER_SOL
          );
          const signatures = await connection.getSignaturesForAddress(
            publicKey,
            {
              limit: 1,
            }
          );
          // console.log(signatures);
          if (signatures.length > 0) {
            const lastestSignature = signatures[0].signature;
            const tx = await connection.getParsedTransaction(
              lastestSignature,
              "confirmed"
            );
            if (tx && tx.meta) {
              const { preBalances, postBalances } = tx.meta;
              const transfered = postBalances[1] - preBalances[1];
              if (transfered > 0) {
                console.log(
                  "FROM =>",
                  tx.transaction.message.accountKeys[0].pubkey.toBase58()
                );
                console.log("VALUE =>", transfered / web3.LAMPORTS_PER_SOL);
                console.log("TxHASH =>", lastestSignature);
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
