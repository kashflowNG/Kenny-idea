import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SendForm from "@/components/SendForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function SendPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const { data } = useQuery({
    queryKey: ['/api/wallets'],
  });

  const wallets = data?.wallets || [];
  const primaryWallet = wallets[0];

  const handleSubmit = async (formData: any) => {
    if (!primaryWallet) {
      toast({
        title: "No wallet found",
        description: "Please create a wallet first",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      await apiRequest(`/api/wallets/${primaryWallet.id}/send`, {
        method: 'POST',
        body: JSON.stringify({
          toAddress: formData.recipient,
          amount: formData.amount,
          currency: formData.currency,
        }),
      });

      toast({
        title: "Transaction sent!",
        description: "Your transaction is being processed",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/wallets'] });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Transaction failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-background border-b border-card-border p-4 flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation('/')}
            data-testid="button-back"
            disabled={sending}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Send Tokens</h1>
        </div>

        <div className="p-4">
          {primaryWallet ? (
            <SendForm
              onSubmit={handleSubmit}
              onScanQR={() => console.log('Scan QR')}
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
