import { useState } from "react";
import { useLocation } from "wouter";
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "@/components/TransactionItem";
import DemoProfileBadge from "@/components/DemoProfileBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

//todo: remove mock functionality
const mockTransactions = [
  { type: 'receive' as const, amount: '250.00', currency: 'TRX' as const, address: 'TXYZabcdefghijklmnopqrstuvwxyz123456', timestamp: '2 hours ago', status: 'completed' as const },
  { type: 'send' as const, amount: '100.50', currency: 'USDT' as const, address: 'TXYZabcdefghijklmnopqrstuvwxyz789012', timestamp: 'Yesterday', status: 'completed' as const },
  { type: 'receive' as const, amount: '500.00', currency: 'TRX' as const, address: 'TXYZabcdefghijklmnopqrstuvwxyz345678', timestamp: '2 days ago', status: 'completed' as const },
];

const mockDemoProfile = {
  email: 'john.demo2024@gmail.com',
  phone: '+1 (555) 987-6543',
  password: 'Demo#123'
};

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [isDemoMode] = useState(true); //todo: remove mock functionality

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">My Wallet</h1>
          <Button 
            size="icon" 
            variant="outline"
            onClick={() => setLocation('/wallets')}
            data-testid="button-add-wallet"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {isDemoMode && (
          <DemoProfileBadge {...mockDemoProfile} />
        )}

        <BalanceCard
          balance="1,234.56"
          usdValue="156.78"
          currency="TRX"
          onSend={() => setLocation('/send')}
          onReceive={() => setLocation('/receive')}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => console.log('View all')}
              data-testid="button-view-all"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {mockTransactions.map((tx, i) => (
              <TransactionItem key={i} {...tx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
