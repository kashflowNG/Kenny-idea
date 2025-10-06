import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "@/components/TransactionItem";
import DemoProfileBadge from "@/components/DemoProfileBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function HomePage() {
  const [, setLocation] = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/wallets'],
  });

  const wallets = data?.wallets || [];
  const primaryWallet = wallets[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!primaryWallet) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">My Wallet</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Wallets Yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Create your first wallet to start managing your TRX and USDT tokens
            </p>
            <Button onClick={() => setLocation('/wallets')} data-testid="button-create-first">
              <Plus className="w-4 h-4 mr-2" />
              Create Wallet
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

        {primaryWallet.isDemo && primaryWallet.demoProfile && (
          <DemoProfileBadge 
            email={primaryWallet.demoProfile.email}
            phone={primaryWallet.demoProfile.phone}
            password={primaryWallet.demoProfile.password}
          />
        )}

        <BalanceCard
          balance={primaryWallet.trxBalance?.toFixed(2) || "0.00"}
          usdValue={primaryWallet.usdValue || "0.00"}
          currency="TRX"
          onSend={() => setLocation('/send')}
          onReceive={() => setLocation('/receive')}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
          </div>

          {primaryWallet.transactions && primaryWallet.transactions.length > 0 ? (
            <div className="space-y-3">
              {primaryWallet.transactions.slice(0, 5).map((tx: any, i: number) => (
                <TransactionItem 
                  key={i} 
                  type={tx.type}
                  amount={tx.amount.toString()}
                  currency="TRX"
                  address={tx.type === 'send' ? tx.to : tx.from}
                  timestamp={new Date(tx.timestamp).toLocaleDateString()}
                  status="completed"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
