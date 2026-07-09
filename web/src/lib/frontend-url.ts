const frontendUrl =
  import.meta.env.VITE_FRONTEND_URL ?? 'http://localhost:5173';

export function getFrontendUrl(path = '') {
  const baseUrl = frontendUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
