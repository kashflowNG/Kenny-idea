import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ReceivePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['/api/wallets'],
  });

  const wallets = data?.wallets || [];
  const primaryWallet = wallets[0];

  const handleCopy = () => {
    toast({
      title: "Address copied!",
      description: "Share this address to receive tokens",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-background border-b border-card-border p-4 flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation('/')}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Receive Tokens</h1>
        </div>

        <div className="p-4 pt-8">
          {primaryWallet ? (
            <QRCodeDisplay 
              address={primaryWallet.address} 
              onCopy={handleCopy}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No wallet available. Please create a wallet first.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
