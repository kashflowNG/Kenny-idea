import BalanceCard from '../BalanceCard';

export default function BalanceCardExample() {
  return (
    <BalanceCard 
      balance="1,234.56"
      usdValue="156.78"
      currency="TRX"
      onSend={() => console.log('Send clicked')}
      onReceive={() => console.log('Receive clicked')}
    />
  );
}
