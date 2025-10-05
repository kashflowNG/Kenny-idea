import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Key, Upload, Sparkles } from "lucide-react";

interface CreateWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateWallet?: (type: 'new' | 'import' | 'demo', data?: any) => void;
}

export default function CreateWalletDialog({ open, onOpenChange, onCreateWallet }: CreateWalletDialogProps) {
  const [privateKey, setPrivateKey] = useState("");
  const [tab, setTab] = useState("new");

  const handleCreate = () => {
    onCreateWallet?.('new');
    console.log('Creating new wallet');
    onOpenChange(false);
  };

  const handleImport = () => {
    onCreateWallet?.('import', { privateKey });
    console.log('Importing wallet:', privateKey);
    onOpenChange(false);
  };

  const handleDemo = () => {
    onCreateWallet?.('demo');
    console.log('Creating demo wallet');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="dialog-create-wallet">
        <DialogHeader>
          <DialogTitle>Add Wallet</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new" data-testid="tab-new">
              <Key className="w-4 h-4 mr-2" />
              New
            </TabsTrigger>
            <TabsTrigger value="import" data-testid="tab-import">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </TabsTrigger>
            <TabsTrigger value="demo" data-testid="tab-demo">
              <Sparkles className="w-4 h-4 mr-2" />
              Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4 mt-6">
            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                A new wallet will be generated with a unique address and private key.
              </p>
              <p className="text-sm font-semibold text-chart-4">
                Make sure to backup your private key securely!
              </p>
            </div>
            <Button 
              onClick={handleCreate} 
              className="w-full"
              data-testid="button-create-new"
            >
              <Key className="w-4 h-4 mr-2" />
              Generate New Wallet
            </Button>
          </TabsContent>

          <TabsContent value="import" className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                className="font-mono"
                data-testid="input-private-key"
              />
            </div>
            <Button 
              onClick={handleImport} 
              className="w-full"
              disabled={!privateKey}
              data-testid="button-import-wallet"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Wallet
            </Button>
          </TabsContent>

          <TabsContent value="demo" className="space-y-4 mt-6">
            <div className="bg-chart-4/20 border border-chart-4/40 rounded-xl p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Demo mode creates a sample wallet with fake profile data for testing.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Auto-generated USA/UK/Australia phone</li>
                <li>Gmail-style email address</li>
                <li>8-character password</li>
                <li>Pre-funded with demo balance</li>
              </ul>
            </div>
            <Button 
              onClick={handleDemo} 
              className="w-full"
              variant="outline"
              data-testid="button-create-demo"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Demo Wallet
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
