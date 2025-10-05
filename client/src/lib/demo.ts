export function generateDemoProfile() {
  const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
  const countries = [
    { code: 'US', format: '+1 (XXX) XXX-XXXX' },
    { code: 'UK', format: '+44 XXXX XXXXXX' },
    { code: 'AU', format: '+61 X XXXX XXXX' }
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}@gmail.com`;
  
  let phone = country.format;
  phone = phone.replace(/X/g, () => Math.floor(Math.random() * 10).toString());
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
  const password = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  
  return { email, phone, password };
}
