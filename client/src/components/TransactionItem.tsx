import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionItemProps {
  type: "send" | "receive";
  amount: string;
  currency: "TRX" | "USDT";
  address: string;
  timestamp: string;
  status?: "completed" | "pending" | "failed";
}

export default function TransactionItem({ 
  type, 
  amount, 
  currency, 
  address, 
  timestamp,
  status = "completed"
}: TransactionItemProps) {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const isPositive = type === "receive";
  
  const statusColors = {
    completed: "text-chart-3",
    pending: "text-chart-4",
    failed: "text-destructive"
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card" data-testid={`transaction-${type}`}>
      <div className={`w-9 h-9 rounded-lg ${isPositive ? 'bg-chart-3/20' : 'bg-primary/20'} flex items-center justify-center shrink-0`}>
        {isPositive ? (
          <ArrowDownLeft className="w-4 h-4 text-chart-3" />
        ) : (
          <ArrowUpRight className="w-4 h-4 text-primary" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" data-testid="text-transaction-type">
          {type === "send" ? "Sent" : "Received"} {currency}
        </p>
        <p className="text-xs text-muted-foreground font-mono truncate">
          {truncatedAddress} · {timestamp}
        </p>
      </div>
      
      <div className="text-right shrink-0">
        <p className={`text-sm font-semibold ${statusColors[status]}`} data-testid="text-amount">
          {isPositive ? "+" : "-"}{amount}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{status}</p>
      </div>
    </div>
  );
}
