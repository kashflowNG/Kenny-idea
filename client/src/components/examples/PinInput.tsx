import { useState } from 'react';
import PinInput from '../PinInput';

export default function PinInputExample() {
  const [pin, setPin] = useState('');

  return (
    <PinInput 
      value={pin}
      onChange={setPin}
      onComplete={(value) => console.log('PIN complete:', value)}
    />
  );
}
