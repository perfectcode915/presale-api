import { createPublicClient, http } from "viem";
import { bscTestnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});

const balance = await publicClient.getBalance({
  address: "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78",
});

console.log(balance);
