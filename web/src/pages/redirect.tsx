import { useEffect, useState } from 'react';

import { getApiUrl } from '../lib/api-url';

import { NotFoundPage } from './not-found';

interface RedirectPageProps {
  shortCode: string;
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
    <main className="m-[10px] flex min-h-[calc(100vh-20px)] items-center justify-center bg-white px-4 text-[#020817]">
      <section className="inline-flex w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-50 px-12 py-16">
        <LogoIcon />

        <h1 className="self-stretch text-center font-['Open_Sans'] text-2xl font-bold leading-8 text-neutral-800">
          {status === 'error'
            ? 'Não foi possível redirecionar'
            : 'Redirecionando...'}
        </h1>

        <div className="self-stretch flex flex-col items-center justify-start gap-1">
          <p className="self-stretch text-center font-['Open_Sans'] text-sm font-semibold leading-4 text-zinc-600">
            {status === 'error'
              ? 'Verifique se a API está em execução e tente novamente.'
              : 'O link será aberto automaticamente em alguns instantes.'}
          </p>

          <p className="self-stretch text-center font-['Open_Sans'] text-sm font-semibold leading-4 text-zinc-600">
            Não foi redirecionado?{' '}
            <a href={redirectUrl} className="text-blue-800 underline">
              Acesse aqui
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
