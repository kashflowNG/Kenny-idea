import QRCodeDisplay from '../QRCodeDisplay';

export default function QRCodeDisplayExample() {
  return (
    <QRCodeDisplay 
      address="TXYZabcdefghijklmnopqrstuvwxyz1234567890"
      onCopy={() => console.log('Copied')}
      onShare={() => console.log('Shared')}
    />
  );
}
