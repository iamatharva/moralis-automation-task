export interface EthBlockNumberResponse {
  jsonrpc: string;
  id: number;
  result: string; 
}

export interface EthBlockDetails {
  number: string; 
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  size: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: Array<{
    hash: string; 
    nonce: string;
    blockHash: string;
    blockNumber: string;
    transactionIndex: string;
    from: string;
    to: string | null;
    value: string;
    gas: string;
    gasPrice: string;
    input: string;
  }>;
}

export interface EthGetBlockByNumberResponse {
  jsonrpc: string;
  id: number;
  result: EthBlockDetails | null;
}

export interface EthTransactionResponse {
  jsonrpc: string;
  id: number;
  result: {
    blockHash: string | null;
    blockNumber: string | null;
    from: string;
    to: string | null;
    gas: string;
    gasPrice: string;
    hash: string; 
    input: string;
    nonce: string;
    transactionIndex: string;
    value: string;
    v: string;
    r: string;
    s: string;
  } | null;
}
