import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { Button } from "@/components/ui/button";

export default function ReceivePage() {
  const [, setLocation] = useLocation();
  //todo: remove mock functionality
  const mockAddress = "TXYZabcdefghijklmnopqrstuvwxyz1234567890";

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
          <QRCodeDisplay address={mockAddress} />
        </div>
      </div>
    </div>
  );
}
