const CHAINS = {
  mainnet: {
    EVM: [
      {
        id: 1,
        name: "Ethereum Mainnet",
        symbol: "ETH",
        endpoint:
          "wss://yolo-weathered-seed.quiknode.pro/4cb47a5c576555d953130952142ce72d72ab3feb/",
        contracts: [],
      },
    ],
    SOL: {
      id: 900,
      name: "Solana",
      symbol: "SOL",
      endpoint: "",
      tokens: [],
    },
    TRON: {
      id: 1000,
      name: "Tron",
      symbol: "TRON",
      endpoint: "https://api.trongrid.io",
      contracts: [],
    },
  },
  testnet: {
    EVM: [
      {
        id: 97,
        name: "BNB Smart Chain Testnet",
        symbol: "tBNB",
        endpoint:
          "wss://bsc-testnet.blockpi.network/v1/ws/a67f53dbd9f24757fc6fd5cb9e537ac7e078e0db",
        contracts: [
          {
            address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
            name: "USDT",
            abi: [
              {
                inputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "constructor",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Approval",
                type: "event",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "OwnershipTransferred",
                type: "event",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Transfer",
                type: "event",
              },
              {
                constant: true,
                inputs: [],
                name: "_decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "_name",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "_symbol",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [
                  { internalType: "address", name: "owner", type: "address" },
                  { internalType: "address", name: "spender", type: "address" },
                ],
                name: "allowance",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  { internalType: "address", name: "spender", type: "address" },
                  { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: true,
                inputs: [
                  { internalType: "address", name: "account", type: "address" },
                ],
                name: "balanceOf",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "decimals",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  { internalType: "address", name: "spender", type: "address" },
                  {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256",
                  },
                ],
                name: "decreaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "getOwner",
                outputs: [
                  { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  { internalType: "address", name: "spender", type: "address" },
                  {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256",
                  },
                ],
                name: "increaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "mint",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "name",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "owner",
                outputs: [
                  { internalType: "address", name: "", type: "address" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: false,
                inputs: [],
                name: "renounceOwnership",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "symbol",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: true,
                inputs: [],
                name: "totalSupply",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transfer",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  { internalType: "address", name: "sender", type: "address" },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transferFrom",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                constant: false,
                inputs: [
                  {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "transferOwnership",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              },
            ],
          },
        ],
      },
    ],
    SOL: {
      id: 901,
      name: "Solana Devnet",
      symbol: "DSOL",
      endpoint: "",
      tokens: [
        {
          address: "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
          name: "USDC-Dev",
        },
        {
          address: "Bv1YvindiQRTjg67bBX24w4SNZoSoDRoXbi6Ww2pJj3W",
          name: "ddd",
        },
      ],
    },
    TRON: {
      id: 1001,
      name: "Tron Testnet (NILE)",
      symbol: "TTRON",
      endpoint: "https://nile.trongrid.io",
      contracts: [
        {
          address: "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj",
          name: "USDT",
          abi: [
            {
              inputs: [
                { name: "name_", type: "string" },
                { name: "symbol_", type: "string" },
              ],
              stateMutability: "Nonpayable",
              type: "Constructor",
            },
            {
              inputs: [
                { indexed: true, name: "owner", type: "address" },
                { indexed: true, name: "spender", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "Approval",
              type: "Event",
            },
            {
              inputs: [
                { name: "userAddress", type: "address" },
                { name: "relayerAddress", type: "address" },
                { name: "functionSignature", type: "bytes" },
              ],
              name: "MetaTransactionExecuted",
              type: "Event",
            },
            {
              inputs: [
                { indexed: true, name: "previousOwner", type: "address" },
                { indexed: true, name: "newOwner", type: "address" },
              ],
              name: "OwnershipTransferred",
              type: "Event",
            },
            {
              inputs: [
                { indexed: true, name: "from", type: "address" },
                { indexed: true, name: "to", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "Transfer",
              type: "Event",
            },
            {
              outputs: [{ type: "string" }],
              name: "ERC712_VERSION",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              inputs: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
              ],
              name: "allowance",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              name: "approve",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              inputs: [{ name: "account", type: "address" }],
              name: "balanceOf",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "uint8" }],
              name: "decimals",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "subtractedValue", type: "uint256" },
              ],
              name: "decreaseAllowance",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bytes" }],
              inputs: [
                { name: "userAddress", type: "address" },
                { name: "functionSignature", type: "bytes" },
                { name: "sigR", type: "bytes32" },
                { name: "sigS", type: "bytes32" },
                { name: "sigV", type: "uint8" },
              ],
              name: "executeMetaTransaction",
              stateMutability: "Payable",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              name: "getChainId",
              stateMutability: "Pure",
              type: "Function",
            },
            {
              outputs: [{ type: "bytes32" }],
              name: "getDomainSeperator",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ name: "nonce", type: "uint256" }],
              inputs: [{ name: "user", type: "address" }],
              name: "getNonce",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "addedValue", type: "uint256" },
              ],
              name: "increaseAllowance",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              inputs: [{ name: "amount", type: "uint256" }],
              name: "mint",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "string" }],
              name: "name",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "address" }],
              name: "owner",
              stateMutability: "View",
              type: "Function",
            },
            {
              name: "renounceOwnership",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "string" }],
              name: "symbol",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              name: "totalSupply",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "recipient", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              name: "transfer",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "sender", type: "address" },
                { name: "recipient", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              name: "transferFrom",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              inputs: [{ name: "newOwner", type: "address" }],
              name: "transferOwnership",
              stateMutability: "Nonpayable",
              type: "Function",
            },
          ],
        },
        {
          address: "TU2T8vpHZhCNY8fXGVaHyeZrKm8s6HEXWe",
          name: "WIN",
          abi: [
            {
              outputs: [{ type: "string" }],
              constant: true,
              name: "name",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "approve",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              constant: true,
              name: "totalSupply",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "transferFrom",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "uint8" }],
              constant: true,
              name: "decimals",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "addedValue", type: "uint256" },
              ],
              name: "increaseAllowance",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "mint",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              inputs: [{ name: "value", type: "uint256" }],
              name: "burn",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              constant: true,
              inputs: [{ name: "owner", type: "address" }],
              name: "balanceOf",
              stateMutability: "View",
              type: "Function",
            },
            {
              inputs: [
                { name: "from", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "burnFrom",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "string" }],
              constant: true,
              name: "symbol",
              stateMutability: "View",
              type: "Function",
            },
            {
              inputs: [{ name: "account", type: "address" }],
              name: "addMinter",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              name: "renounceMinter",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "spender", type: "address" },
                { name: "subtractedValue", type: "uint256" },
              ],
              name: "decreaseAllowance",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "transfer",
              stateMutability: "Nonpayable",
              type: "Function",
            },
            {
              outputs: [{ type: "bool" }],
              constant: true,
              inputs: [{ name: "account", type: "address" }],
              name: "isMinter",
              stateMutability: "View",
              type: "Function",
            },
            {
              outputs: [{ type: "uint256" }],
              constant: true,
              inputs: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
              ],
              name: "allowance",
              stateMutability: "View",
              type: "Function",
            },
            {
              inputs: [
                { name: "name", type: "string" },
                { name: "symbol", type: "string" },
                { name: "decimals", type: "uint8" },
              ],
              stateMutability: "Nonpayable",
              type: "Constructor",
            },
            {
              inputs: [{ indexed: true, name: "account", type: "address" }],
              name: "MinterAdded",
              type: "Event",
            },
            {
              inputs: [{ indexed: true, name: "account", type: "address" }],
              name: "MinterRemoved",
              type: "Event",
            },
            {
              inputs: [
                { indexed: true, name: "from", type: "address" },
                { indexed: true, name: "to", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "Transfer",
              type: "Event",
            },
            {
              inputs: [
                { indexed: true, name: "owner", type: "address" },
                { indexed: true, name: "spender", type: "address" },
                { name: "value", type: "uint256" },
              ],
              name: "Approval",
              type: "Event",
            },
          ],
        },
      ],
    },
  },
};

const WALLET_ADDRESS = {
  EVM: "0x0FEaD8A060e941d640520Ed0B92BaC4c294F4f78",
  SOL: "65s8ZnE6ziJDUoDUMSXDdf83Gsze2UNReK1uTWTQGGpG",
  TRON: "TKK7RYaChFwbRjWNmh2iR38mggxPHuEq9A",
};

const TEST_MODE = true;

module.exports = {
  CHAINS,
  WALLET_ADDRESS,
  TEST_MODE,
};
