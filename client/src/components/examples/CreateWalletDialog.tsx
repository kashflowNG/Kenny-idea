import { useState } from 'react';
import CreateWalletDialog from '../CreateWalletDialog';
import { Button } from '@/components/ui/button';

export default function CreateWalletDialogExample() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <CreateWalletDialog 
        open={open}
        onOpenChange={setOpen}
        onCreateWallet={(type, data) => console.log('Wallet created:', type, data)}
      />
    </>
  );
}
