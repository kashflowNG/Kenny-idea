
export async function authFetch(url: string, options: RequestInit = {}) {
  const sessionToken = localStorage.getItem('sessionToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}
