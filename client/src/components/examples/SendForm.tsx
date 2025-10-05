import SendForm from '../SendForm';

export default function SendFormExample() {
  return (
    <SendForm 
      onSubmit={(data) => console.log('Form submitted:', data)}
      onScanQR={() => console.log('Scan QR clicked')}
    />
  );
}
