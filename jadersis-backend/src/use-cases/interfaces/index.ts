export interface IRepositoryDb {
    shouldTransfer(params: {
      amount: number;
      sourceChainId: string;
      destinationChainId: string;
    }): Promise<boolean>;
  }
  
  export interface IBlockchainProvider {
    lockUSDT(params: {
      contractAddress: string;
      amount: number;
      chainId: string;
    }): Promise<BlockchainTransaction>;
  
    releaseUSDT(params: {
      contractAddress: string;
      amount: number;
      chainId: string;
    }): Promise<BlockchainTransaction>;
  }
  
  export interface IBridgeProvider {
    transfer(params: {
      sourceChainId: string;
      destinationChainId: string;
      amount: number;
      sourceAddress: string;
      destinationAddress: string;
    }): Promise<BridgeTransaction>;
  }
  
  export interface ITransactionDb {
    recordTransaction(params: {
      sourceTransaction: BlockchainTransaction;
      bridgeTransaction: BridgeTransaction;
      destinationTransaction: BlockchainTransaction;
    }): Promise<void>;
  }
  
  export interface BlockchainTransaction {
    transactionHash: string;
    chainId: string;
    amount: number;
    contractAddress: string;
    timestamp: number;
  }
  
  export interface BridgeTransaction {
    transactionId: string;
    sourceChainId: string;
    destinationChainId: string;
    amount: number;
    sourceAddress: string;
    destinationAddress: string;
    timestamp: number;
  }
  