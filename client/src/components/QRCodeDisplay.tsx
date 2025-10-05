import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  address: string;
  onCopy?: () => void;
  onShare?: () => void;
}

export default function QRCodeDisplay({ address, onCopy, onShare }: QRCodeDisplayProps) {
  const truncatedAddress = `${address.slice(0, 8)}...${address.slice(-8)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    onCopy?.();
    console.log('Address copied');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My TRON Wallet Address',
          text: address,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
    onShare?.();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-white p-6 rounded-3xl" data-testid="qr-code-container">
        <QRCodeSVG 
          value={address} 
          size={200}
          level="H"
          includeMargin={false}
        />
      </div>
      
      <div className="w-full space-y-3">
        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Your Address</p>
          <p className="font-mono text-sm break-all" data-testid="text-address">{truncatedAddress}</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleCopy}
            className="flex-1"
            variant="outline"
            data-testid="button-copy-address"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </Button>
          <Button 
            onClick={handleShare}
            className="flex-1"
            variant="outline"
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
