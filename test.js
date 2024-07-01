import { createPublicClient, http, formatEther, parseAbiItem } from "viem";
import { bscTestnet } from "viem/chains";
import { abi } from "./abi.js";

const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});

const balance = await publicClient.getBalance({
  address: "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78",
});

console.log(formatEther(balance), bscTestnet.nativeCurrency.symbol);

// const unwatch = publicClient.watchEvent({
//   address: "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78",
//   event: parseAbiItem(
//     "event Transfer(address indexed from, address indexed to, uint256 value)"
//   ),
//   args: {
//     from: "0x18Ab248796490EE91A21AAaa41AD491C455CE267",
//     to: "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78",
//   },
//   onLogs: (logs) => console.log(logs),
// });

// const unwatch = publicClient.watchPendingTransactions({
//   onTransactions: async (hashes) => {
//     console.log(hashes);
// let transaction = {};
// for (const hash of hashes) {
//   try {
//     transaction = await publicClient.getTransaction({
//       hash,
//     });
//     if (transaction.to === "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78") {
//       console.log(
//         transaction.from,
//         formatEther(transaction.value),
//         bscTestnet.nativeCurrency.symbol
//       );
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }
//   },
// });

const unwatch = publicClient.watchBlocks({
  onBlock: (block) => console.log(block),
});
