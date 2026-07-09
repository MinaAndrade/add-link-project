const apiUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3333';

export function getApiUrl(path = '') {
  const baseUrl = apiUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
