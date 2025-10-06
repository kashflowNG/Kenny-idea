const TronWeb = require('tronweb');

const TRON_GRID_API = 'https://api.trongrid.io';
const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

export const tronWeb = new TronWeb({
  fullHost: TRON_GRID_API,
});

export async function createNewWallet() {
  const account = await tronWeb.createAccount();
  return {
    address: account.address.base58,
    privateKey: account.privateKey,
  };
}

export async function importWallet(privateKey: string) {
  try {
    const address = tronWeb.address.fromPrivateKey(privateKey);
    return {
      address,
      privateKey,
    };
  } catch (error) {
    throw new Error('Invalid private key');
  }
}

export async function getTRXBalance(address: string): Promise<number> {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return balance / 1_000_000;
  } catch (error) {
    return 0;
  }
}

export async function getUSDTBalance(address: string): Promise<number> {
  try {
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    const balance = await contract.balanceOf(address).call();
    return Number(balance) / 1_000_000;
  } catch (error) {
    return 0;
  }
}

export async function sendTRX(fromPrivateKey: string, toAddress: string, amount: number) {
  try {
    const tronWebWithKey = new TronWeb({
      fullHost: TRON_GRID_API,
      privateKey: fromPrivateKey,
    });
    
    const tx = await tronWebWithKey.trx.sendTransaction(
      toAddress,
      amount * 1_000_000
    );
    
    return {
      success: true,
      txId: tx.txid,
      transaction: tx,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Transaction failed',
    };
  }
}

export async function sendUSDT(fromPrivateKey: string, toAddress: string, amount: number) {
  try {
    const tronWebWithKey = new TronWeb({
      fullHost: TRON_GRID_API,
      privateKey: fromPrivateKey,
    });
    
    const contract = await tronWebWithKey.contract().at(USDT_CONTRACT);
    const tx = await contract.transfer(toAddress, amount * 1_000_000).send();
    
    return {
      success: true,
      txId: tx,
      transaction: tx,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Transaction failed',
    };
  }
}

export async function getTRXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    const data = await response.json();
    return data.tron?.usd || 0;
  } catch (error) {
    return 0;
  }
}

export async function getTransactionHistory(address: string, limit = 20) {
  try {
    const response = await fetch(`${TRON_GRID_API}/v1/accounts/${address}/transactions?limit=${limit}`);
    const data = await response.json();
    
    if (!data.data) return [];
    
    return data.data.map((tx: any) => ({
      txId: tx.txID,
      timestamp: tx.block_timestamp,
      type: tx.raw_data.contract[0].parameter.value.owner_address === address ? 'send' : 'receive',
      amount: tx.raw_data.contract[0].parameter.value.amount / 1_000_000,
      from: tronWeb.address.fromHex(tx.raw_data.contract[0].parameter.value.owner_address),
      to: tronWeb.address.fromHex(tx.raw_data.contract[0].parameter.value.to_address),
    }));
  } catch (error) {
    return [];
  }
}
