import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/not-found';
import { RedirectPage } from './pages/redirect';
import { ColorsPage } from './pages/style-guide/colors';
import { ComponentGuidePage } from './pages/style-guide/components';
import { TypographyPage } from './pages/style-guide/typography';

export function App() {
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');

  if (!pathname) {
    return <HomePage />;
  }

  if (pathname === 'style-guide' || pathname === 'style-guide/cores') {
    return <ColorsPage />;
  }

  if (pathname === 'style-guide/tipografia') {
    return <TypographyPage />;
  }

  if (pathname === 'style-guide/componentes') {
    return <ComponentGuidePage />;
  }

  if (/^[a-zA-Z0-9_-]{3,10}$/.test(pathname)) {
    return <RedirectPage shortCode={pathname} />;
  }

  return <NotFoundPage />;
}
