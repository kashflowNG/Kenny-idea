import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import WalletItem from "@/components/WalletItem";
import CreateWalletDialog from "@/components/CreateWalletDialog";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function WalletsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/wallets'],
  });

  const handleCreateWallet = async (type: 'new' | 'import' | 'demo', data?: any) => {
    try {
      let endpoint = '/api/wallets/create';
      let body = {};

      if (type === 'import') {
        endpoint = '/api/wallets/import';
        body = { privateKey: data.privateKey };
      } else if (type === 'demo') {
        endpoint = '/api/wallets/demo';
      }

      const response = await apiRequest(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      toast({
        title: "Wallet created!",
        description: type === 'demo' ? "Demo wallet with profile generated" : "Your new wallet is ready",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/wallets'] });
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Failed to create wallet",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const wallets = data?.wallets || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Wallets</h1>
          <Button 
            onClick={() => setDialogOpen(true)}
            data-testid="button-add-wallet"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Wallet
          </Button>
        </div>

        {wallets.length > 0 ? (
          <div className="space-y-3">
            {wallets.map((wallet: any) => (
              <WalletItem
                key={wallet.id}
                address={wallet.address}
                balance={wallet.trxBalance?.toFixed(2) || "0.00"}
                usdValue={wallet.usdValue || "0.00"}
                onClick={() => console.log('Wallet clicked:', wallet.address)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Wallet className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Wallets Yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Create your first wallet to start managing your TRX and USDT tokens
            </p>
            <Button onClick={() => setDialogOpen(true)} data-testid="button-create-first">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Wallet
            </Button>
          </div>
        )}

        <CreateWalletDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onCreateWallet={handleCreateWallet}
        />
      </div>
    </div>
  );
}
