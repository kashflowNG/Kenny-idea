import { ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WalletItemProps {
  address: string;
  balance: string;
  usdValue: string;
  onClick?: () => void;
}

export default function WalletItem({ address, balance, usdValue, onClick }: WalletItemProps) {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    console.log('Address copied:', address);
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-card rounded-2xl hover-elevate cursor-pointer"
      data-testid={`wallet-item-${address.slice(-4)}`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#E6004D] flex items-center justify-center text-white font-semibold">
        {address.slice(0, 2)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm font-medium truncate" data-testid="text-address">{truncatedAddress}</p>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-6 w-6 shrink-0"
            onClick={handleCopy}
            data-testid="button-copy"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{balance} TRX · ${usdValue}</p>
      </div>
      
      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
    </div>
  );
}
