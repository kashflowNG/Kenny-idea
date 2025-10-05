import { useState } from "react";
import { ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SendFormProps {
  onSubmit?: (data: { recipient: string; amount: string; currency: string }) => void;
  onScanQR?: () => void;
}

export default function SendForm({ onSubmit, onScanQR }: SendFormProps) {
  const [currency, setCurrency] = useState("TRX");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ recipient, amount, currency });
    console.log('Send:', { recipient, amount, currency });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={currency} onValueChange={setCurrency}>
        <TabsList className="grid w-full grid-cols-2" data-testid="tabs-currency">
          <TabsTrigger value="TRX" data-testid="tab-trx">TRX</TabsTrigger>
          <TabsTrigger value="USDT" data-testid="tab-usdt">USDT-TRC20</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <div className="flex gap-2">
          <Input
            id="recipient"
            placeholder="T..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="flex-1 font-mono"
            data-testid="input-recipient"
          />
          <Button 
            type="button" 
            size="icon" 
            variant="outline"
            onClick={onScanQR}
            data-testid="button-scan-qr"
          >
            <QrCode className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="amount">Amount</Label>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={() => setAmount("1000")}
            data-testid="button-max"
          >
            Max
          </Button>
        </div>
        <Input
          id="amount"
          type="number"
          step="0.000001"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-2xl font-semibold h-14"
          data-testid="input-amount"
        />
        <p className="text-sm text-muted-foreground">≈ $0.00 USD</p>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Network Fee</span>
          <span className="font-medium">~1.5 TRX</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold">{amount || "0"} {currency}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full h-12"
        disabled={!recipient || !amount}
        data-testid="button-continue"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
