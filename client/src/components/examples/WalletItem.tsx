import WalletItem from '../WalletItem';

export default function WalletItemExample() {
  return (
    <WalletItem 
      address="TXYZabcdefghijklmnopqrstuvwxyz123456"
      balance="1,234.56"
      usdValue="156.78"
      onClick={() => console.log('Wallet clicked')}
    />
  );
}
