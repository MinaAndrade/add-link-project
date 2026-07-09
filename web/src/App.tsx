import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/not-found';
import { RedirectPage } from './pages/redirect';

export function App() {
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');

  if (!pathname) {
    return <HomePage />;
  }

  if (/^[a-zA-Z0-9_-]{3,10}$/.test(pathname)) {
    return <RedirectPage shortCode={pathname} />;
  }

  return <NotFoundPage />;
}
