import { useState } from "react";
import WalletItem from "@/components/WalletItem";
import CreateWalletDialog from "@/components/CreateWalletDialog";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import { generateDemoProfile } from "@/lib/demo";

//todo: remove mock functionality
const mockWallets = [
  { address: 'TXYZabcdefghijklmnopqrstuvwxyz123456', balance: '1,234.56', usdValue: '156.78' },
  { address: 'TABCdefghijklmnopqrstuvwxyz789012345', balance: '5,678.90', usdValue: '720.45' },
];

export default function WalletsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateWallet = (type: 'new' | 'import' | 'demo', data?: any) => {
    if (type === 'demo') {
      const profile = generateDemoProfile();
      console.log('Demo profile generated:', profile);
    }
    console.log('Creating wallet:', type, data);
  };

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

        {mockWallets.length > 0 ? (
          <div className="space-y-3">
            {mockWallets.map((wallet, i) => (
              <WalletItem
                key={i}
                {...wallet}
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
