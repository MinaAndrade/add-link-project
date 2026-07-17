import { useEffect, useState } from 'react';

import { getApiUrl } from '../lib/api-url';
import type { ShortCode } from '../types/link';

import { NotFoundPage } from './not-found';

interface RedirectPageProps {
  shortCode: ShortCode;
}

function LogoIcon() {
  return <img src="/meta/brevly-logo.svg" alt="Logo" className="h-12 w-12" />;
}

export function RedirectPage({ shortCode }: RedirectPageProps) {
  const [status, setStatus] = useState<'loading' | 'not-found' | 'error'>(
    'loading'
  );

  const redirectUrl = getApiUrl(shortCode);

  useEffect(() => {
    async function redirect() {
      try {
        const response = await fetch(redirectUrl, {
          method: 'GET',
          redirect: 'manual',
        });

        if (response.status === 404) {
          setStatus('not-found');
          return;
        }

        window.location.replace(redirectUrl);
      } catch {
        setStatus('error');
      }
    }

    redirect();
  }, [redirectUrl]);

  if (status === 'not-found') {
    return <NotFoundPage />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-canvas px-3 font-sans text-content-strong sm:m-[10px] sm:min-h-[calc(100vh-20px)] sm:bg-white sm:px-4">
      <section className="inline-flex w-full max-w-[366px] -translate-y-10 flex-col items-center justify-center gap-6 rounded-lg bg-surface-card px-5 py-12 sm:max-w-[580px] sm:translate-y-0 sm:px-12 sm:py-16">
        <LogoIcon />

        <h1 className="self-stretch text-center font-sans text-2xl font-bold leading-8 text-content-strong">
          {status === 'error'
            ? 'Não foi possível redirecionar'
            : 'Redirecionando...'}
        </h1>

        <div className="flex flex-col items-center justify-start gap-1 self-stretch">
          <p className="self-stretch text-center font-sans text-sm font-semibold leading-[18px] text-content-body">
            {status === 'error'
              ? 'Verifique se a API está em execução e tente novamente.'
              : 'O link será aberto automaticamente em alguns instantes.'}
          </p>

          <p className="self-stretch text-center font-sans text-sm font-semibold leading-[18px] text-content-body">
            Não foi redirecionado?{' '}
            <a href={redirectUrl} className="text-brand underline">
              Acesse aqui
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
