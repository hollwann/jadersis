#!/usr/bin/env -S npx tsx
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import {AllbridgeCoreSdk, ChainSymbol, Messenger, nodeRpcUrlsDefault, } from "@allbridge/bridge-core-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

interface TransferRequest {
  sourceChainId: ChainSymbol;
  destinationChainId: ChainSymbol;
  sourceAddress: string;
  destinationAddress: string;
  amount: string;
}

const sdk = new AllbridgeCoreSdk({
  ...nodeRpcUrlsDefault,
  [ChainSymbol.ETH]: 'http://localhost:8545',
});

app.post('/v1/transfer', async (req: Request, res: Response): Promise<void> => {
  console.log("req.body", req.body)
  const { sourceChainId, destinationChainId, sourceAddress, destinationAddress, amount } = req.body as TransferRequest;

   if (!sourceChainId) {
    res.status(400).json({ error: 'Missing sourceChainId' });
  return
}
  if (!destinationChainId) {
    res.status(400).json({ error: 'Missing destinationChainId' });
  return
}
  if (!sourceAddress) {
    res.status(400).json({ error: 'Missing sourceAddress' });
  return
}
  if (!destinationAddress) {
    res.status(400).json({ error: 'Missing destinationAddress' });
  return
}
  if (!amount) {
    res.status(400).json({ error: 'Missing amount' });
  return
}

  const supportedChains = await sdk.chainDetailsMap();

  const {tokens} = supportedChains[sourceChainId];
  const sourceToken = tokens.find(token => token.symbol === 'USDT');

  const {tokens: destinationTokens} = supportedChains[destinationChainId];
  const destinationToken = destinationTokens.find(token => token.symbol === 'USDT');

  if (!sourceToken || !destinationToken) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }

  const rawTx = await sdk.bridge.rawTxBuilder.send({
    amount,
    fromAccountAddress: sourceAddress,
    toAccountAddress: destinationAddress,
    sourceToken: sourceToken,
    destinationToken: destinationToken,
    messenger: Messenger.ALLBRIDGE,
  });

  console.log(rawTx);
  res.json({ rawTx });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
