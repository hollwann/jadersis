#!/usr/bin/env -S npx tsx

import { ethers } from 'ethers';
import { Pool, Position, nearestUsableTick } from '@uniswap/v3-sdk';
import { Token } from '@uniswap/sdk-core';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

// Define constants
const ARBITRUM_RPC_URL = 'https://arb1.arbitrum.io/rpc';
const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
const POOL_ADDRESS = '0x5e09ACf80C0296740eC5d6F643005a4ef8DaA694';
const WALLET_ADDRESS = '0xc38dF337eEbec8a8C022098F78975862e47516b4';

async function getLiquidity() {
  // Connect to the pool contract
  const poolContract = new ethers.Contract(POOL_ADDRESS, IUniswapV3PoolABI, provider);

  const token1 = await poolContract.token0();
  console.log(`Token0: ${token1}`);


  // Fetch pool information
  const [token0Address, token1Address, fee, liquidity, slot0] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const [sqrtPriceX96, tick] = slot0;

  // Create token instances
  const token0 = new Token(42161, token0Address, 18); // Assuming 18 decimals for simplicity
  const token1 = new Token(42161, token1Address, 18);

  // Create the pool instance
  const pool = new Pool(
    token0,
    token1,
    fee,
    sqrtPriceX96.toString(),
    liquidity.toString(),
    tick
  );

  console.log(`Liquidity of Pool: ${liquidity.toString()}`);

  // Fetch position details of the wallet (if applicable)
  const positions = await poolContract.positions(WALLET_ADDRESS);
  console.log(`Position details:`, positions);
}

getLiquidity().catch(console.error);
