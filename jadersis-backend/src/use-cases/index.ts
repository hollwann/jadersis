import {
    IRepositoryDb,
    IBlockchainProvider,
    IBridgeProvider,
    ITransactionDb,
  } from './interfaces';
  
  interface TransferUSDTBetweenContractsConstructor {
  }
  
  interface TransferUSDTBetweenContractsRequest {
  }
  
  export class TransferUSDTBetweenContracts {
  
    public constructor({
    }: TransferUSDTBetweenContractsConstructor) {
    }
  
    public async execute({
      amount,
      sourceChainId,
      destinationChainId,
      sourceAddress,
      destinationAddress,
    }: TransferUSDTBetweenContractsRequest): Promise<void> {
     
    }
  }
  