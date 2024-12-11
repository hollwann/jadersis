import {
    IRepositoryDb,
    IBlockchainProvider,
    IBridgeProvider,
    ITransactionDb,
  } from './interfaces';
  
  interface TransferUSDTBetweenContractsConstructor {
    repositoryDb: IRepositoryDb;
    sourceBlockchainProvider: IBlockchainProvider;
    destinationBlockchainProvider: IBlockchainProvider;
    bridgeProvider: IBridgeProvider;
    transactionDb: ITransactionDb;
  }
  
  interface TransferUSDTBetweenContractsRequest {
    amount: number;
    sourceChainId: string;
    destinationChainId: string;
    sourceContractAddress: string;
    destinationContractAddress: string;
  }
  
  export class TransferUSDTBetweenContracts {
    private repositoryDb: IRepositoryDb;
    private sourceBlockchainProvider: IBlockchainProvider;
    private destinationBlockchainProvider: IBlockchainProvider;
    private bridgeProvider: IBridgeProvider;
    private transactionDb: ITransactionDb;
  
    public constructor({
      repositoryDb,
      sourceBlockchainProvider,
      destinationBlockchainProvider,
      bridgeProvider,
      transactionDb,
    }: TransferUSDTBetweenContractsConstructor) {
      this.repositoryDb = repositoryDb;
      this.sourceBlockchainProvider = sourceBlockchainProvider;
      this.destinationBlockchainProvider = destinationBlockchainProvider;
      this.bridgeProvider = bridgeProvider;
      this.transactionDb = transactionDb;
    }
  
    public async execute({
      amount,
      sourceChainId,
      destinationChainId,
      sourceContractAddress,
      destinationContractAddress,
    }: TransferUSDTBetweenContractsRequest): Promise<void> {
      const shouldTransfer = await this.repositoryDb.shouldTransfer({
        amount,
        sourceChainId,
        destinationChainId,
      });
  
      if (!shouldTransfer) {
        throw new Error('Transfer conditions not met.');
      }
  
      const sourceTransaction = await this.sourceBlockchainProvider.lockUSDT({
        contractAddress: sourceContractAddress,
        amount,
        chainId: sourceChainId,
      });
  
      const bridgeTransaction = await this.bridgeProvider.transfer({
        sourceChainId,
        destinationChainId,
        amount,
        sourceAddress: sourceContractAddress,
        destinationAddress: destinationContractAddress,
      });
  
      const destinationTransaction =
        await this.destinationBlockchainProvider.releaseUSDT({
          contractAddress: destinationContractAddress,
          amount,
          chainId: destinationChainId,
        });
  
      // Step 5: Record the transaction in the database
      await this.transactionDb.recordTransaction({
        sourceTransaction,
        bridgeTransaction,
        destinationTransaction,
      });
    }
  }
  