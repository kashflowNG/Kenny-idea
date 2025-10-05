import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BalanceCardProps {
  balance: string;
  usdValue: string;
  currency: "TRX" | "USDT";
  onSend?: () => void;
  onReceive?: () => void;
}

export default function BalanceCard({ balance, usdValue, currency, onSend, onReceive }: BalanceCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-primary via-primary to-[#E6004D]">
      <div className="relative z-10">
        <p className="text-sm font-medium text-white/70 mb-1">{currency} Balance</p>
        <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">{balance}</h2>
        <p className="text-base text-white/70 mb-6">${usdValue} USD</p>
        
        <div className="flex gap-3">
          <Button 
            onClick={onSend}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            data-testid="button-send"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button 
            onClick={onReceive}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            data-testid="button-receive"
          >
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            Receive
          </Button>
        </div>
      </div>
    </div>
  );
}
