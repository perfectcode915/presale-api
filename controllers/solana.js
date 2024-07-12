const web3 = require("@solana/web3.js");
const solToken = require("@solana/spl-token");
const { WALLET_ADDRESS, CHAINS, TEST_MODE } = require("../config/constants");

let currentBalance,
  signatures,
  mintAddresses = [];

const chain = TEST_MODE ? CHAINS.testnet.SOL : CHAINS.mainnet.SOL;
const connection = new web3.Connection(
  web3.clusterApiUrl(TEST_MODE ? "devnet" : "mainnet-beta")
);

const publicKey = new web3.PublicKey(WALLET_ADDRESS.SOL);

for (const solToken of chain.tokens) {
  mintAddresses.push(new web3.PublicKey(solToken.address));
}

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

    for (let i = 0; i < chain.tokens.length; i++) {
      const associatedTokenAddress = await solToken.getAssociatedTokenAddress(
        mintAddresses[i],
        publicKey
      );
      const accountInfo = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: mintAddresses[i] }
      );
      const tokenAccount = accountInfo.value.find(
        (account) =>
          account.pubkey.toBase58() === associatedTokenAddress.toBase58()
      );
      if (tokenAccount) {
        const tokenBalance =
          tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
        console.log(
          chain.id,
          chain.name,
          "=>",
          tokenBalance,
          chain.tokens[i].name
        );
      }
    }

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

    const TOKEN_PROGRAM_ID = new web3.PublicKey(
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
    );
    const TRANSFER_SIGNATURE = "Program log: Instruction: TransferChecked";
    connection.onLogs(
      TOKEN_PROGRAM_ID,
      async (logs, context) => {
        if (
          logs.signature !==
          "1111111111111111111111111111111111111111111111111111111111111111"
        )
          for (const log of logs.logs) {
            if (log.includes(TRANSFER_SIGNATURE)) {
              const signature = logs.signature;
              const transaction = await connection.getParsedTransaction(
                signature,
                "confirmed"
              );
              if (transaction && transaction.meta) {
                const { preTokenBalances, postTokenBalances } =
                  transaction.meta;
                if (preTokenBalances.length && postTokenBalances.length) {
                  if (
                    preTokenBalances[1].owner === WALLET_ADDRESS.SOL &&
                    postTokenBalances[1].owner === WALLET_ADDRESS.SOL
                  ) {
                    for (const token of chain.tokens) {
                      if (preTokenBalances[0].mint === token.address) {
                        console.log(
                          "--------------------------------------------------------------------"
                        );
                        console.log("ChainID:", chain.id, token.name);
                        console.log("TxHASH =>", signature);
                        console.log("FROM =>", preTokenBalances[0].owner);
                        console.log(
                          "VALUE =>",
                          postTokenBalances[1].uiTokenAmount.uiAmount -
                            preTokenBalances[1].uiTokenAmount.uiAmount,
                          token.name
                        );
                        break;
                      }
                    }
                  }
                }
              }
              break;
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
