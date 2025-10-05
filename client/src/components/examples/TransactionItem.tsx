import TransactionItem from '../TransactionItem';

export default function TransactionItemExample() {
  return (
    <div className="space-y-3">
      <TransactionItem 
        type="receive"
        amount="100.00"
        currency="TRX"
        address="TXYZabcdefghijklmnopqrstuvwxyz123456"
        timestamp="2 hours ago"
        status="completed"
      />
      <TransactionItem 
        type="send"
        amount="50.00"
        currency="USDT"
        address="TXYZabcdefghijklmnopqrstuvwxyz123456"
        timestamp="Yesterday"
        status="completed"
      />
    </div>
  );
}
