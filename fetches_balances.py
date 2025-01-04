import json
from web3 import Web3

# 1. Arbitrum RPC endpoint (replace with your own)
ARBITRUM_RPC = "https://arb1.arbitrum.io/rpc"

# 2. Connect to Arbitrum via Web3
web3 = Web3(Web3.HTTPProvider(ARBITRUM_RPC))
if not web3.is_connected():
    raise ConnectionError("Failed to connect to Arbitrum RPC.")

# 3. Set your address (the address whose LP positions you want to read)
OWNER_ADDRESS = "0xc38dF337eEbec8a8C022098F78975862e47516b4"

# 4. Nonfungible Position Manager (NPM) contract info for PancakeSwap V3 on Arbitrum
NPM_ADDRESS = web3.to_checksum_address("0x46A15B0b27311cedF172AB29E4f4766fbE7F4364")
NPM_ABI = [
    {
        "inputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],
        "name": "positions",
        "outputs": [
            {"internalType": "uint96","name": "nonce","type": "uint96"},
            {"internalType": "address","name": "operator","type": "address"},
            {"internalType": "address","name": "token0","type": "address"},
            {"internalType": "address","name": "token1","type": "address"},
            {"internalType": "uint24","name": "fee","type": "uint24"},
            {"internalType": "int24","name": "tickLower","type": "int24"},
            {"internalType": "int24","name": "tickUpper","type": "int24"},
            {"internalType": "uint128","name": "liquidity","type": "uint128"},
            {"internalType": "uint256","name": "feeGrowthInside0LastX128","type": "uint256"},
            {"internalType": "uint256","name": "feeGrowthInside1LastX128","type": "uint256"},
            {"internalType": "uint128","name": "tokensOwed0","type": "uint128"},
            {"internalType": "uint128","name": "tokensOwed1","type": "uint128"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "address","name": "owner","type": "address"},
            {"internalType": "uint256","name": "index","type": "uint256"}
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [{"internalType": "uint256","name": "tokenId","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address","name": "owner","type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256","name": "balance","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
]

# 5. Initialize the contract
npm_contract = web3.eth.contract(address=NPM_ADDRESS, abi=NPM_ABI)

# 6. Fetch how many NFT positions the address holds
balance = npm_contract.functions.balanceOf(OWNER_ADDRESS).call()
print(f"Address {OWNER_ADDRESS} has {balance} PancakeSwap V3 position(s) on Arbitrum.")

TOKENS = {
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": "USDC",
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": "USDT",
    "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": "WBTC",
    "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": "USDC.e",
    "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf": "cbBTC",
}

# 7. For each position index, retrieve the token ID, then fetch position details
positions = []
for i in range(balance):
    token_id = npm_contract.functions.tokenOfOwnerByIndex(OWNER_ADDRESS, i).call()
    
    # positions(tokenId) returns multiple values in a tuple:
    # (nonce, operator, token0, token1, fee, tickLower, tickUpper, liquidity, feeGrowthInside0LastX128,
    #  feeGrowthInside1LastX128, tokensOwed0, tokensOwed1)
    pos_data = npm_contract.functions.positions(token_id).call()
    
    position_dict = {
        "token_id": token_id,
        "nonce": pos_data[0],
        "operator": pos_data[1],
        "token0": pos_data[2],
        "token0_symbol": TOKENS.get(pos_data[2], "Unknown"),
        "token1": pos_data[3],
        "token1_symbol": TOKENS.get(pos_data[3], "Unknown"),
        "fee": pos_data[4],
        "tickLower": pos_data[5],
        "tickUpper": pos_data[6],
        "liquidity": pos_data[7],
        "feeGrowthInside0LastX128": pos_data[8],
        "feeGrowthInside1LastX128": pos_data[9],
        "tokensOwed0": pos_data[10],
        "tokensOwed1": pos_data[11]
    }

    positions.append(position_dict)

# 8. Print out the positions or handle them as needed
for p in positions:
    print(json.dumps(p, indent=2))


