import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { fetchLinks } from '../http/fetch-links';
import { getFrontendUrl } from '../lib/frontend-url';

import { CopyButton } from './copy-button';
import { DeleteButton } from './delete-button';
import { EmptyState } from './empty-state';

function getDisplayUrl(url: string) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

function getAccessLabel(accessCount: number) {
  return `${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`;
}

function AccessCount({ accessCount }: { accessCount: number }) {
  const previousCount = useRef(accessCount);
  const [isIncremented, setIsIncremented] = useState(false);

  useEffect(() => {
    if (accessCount <= previousCount.current) {
      previousCount.current = accessCount;
      return;
    }

    setIsIncremented(true);
    previousCount.current = accessCount;

    const timeoutId = window.setTimeout(() => {
      setIsIncremented(false);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, [accessCount]);

  return (
    <span
      className={`w-fit whitespace-nowrap rounded text-xs leading-4 transition sm:ml-auto sm:text-right ${
        isIncremented
          ? 'bg-brand/10 px-1.5 py-1 text-brand ring-1 ring-brand/20'
          : 'text-content-body'
      }`}
    >
      {getAccessLabel(accessCount)}
    </span>
  );
}

/**
 * Renders stored links. Use `id` for record mutations and `shortCode` for the
 * public URL segment used in navigation, display, and copy actions.
 */
export function LinksTable() {
  const {
    data = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[102px] justify-center border-t border-border-subtle py-10">
        <p className="text-sm text-content-muted">Carregando links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-border-subtle bg-surface-danger p-6 text-center">
        <p className="font-semibold text-danger">
          Não foi possível carregar os links.
        </p>

        <p className="mt-2 text-sm text-content-body">
          Verifique se a API está em execução.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="mx-auto mt-4 flex h-8 items-center gap-1.5 rounded bg-surface-canvas px-3 text-xs font-semibold leading-4 text-content-body transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
          {isFetching ? 'Tentando...' : 'Tentar novamente'}
        </button>
      </div>
    );
  }

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <div className="max-h-list-max overflow-y-auto border-t border-border-subtle">
      {data.map(link => (
        <div
          key={link.id}
          className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 border-b border-border-subtle py-3 last:border-b-0 sm:grid-cols-[minmax(0,347px)_61px_68px] sm:gap-5 sm:py-4"
        >
          <div className="min-w-0 space-y-1">
            <a
              href={getFrontendUrl(link.shortCode)}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-sm font-semibold leading-[18px] text-brand hover:underline"
            >
              brev.ly/{link.shortCode}
            </a>

            <a
              href={link.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate text-xs leading-4 text-content-body hover:text-brand"
            >
              {getDisplayUrl(link.originalUrl)}
            </a>
          </div>

          <AccessCount accessCount={link.accessCount} />

          <div className="flex gap-1">
            <CopyButton shortCode={link.shortCode} />
            <DeleteButton id={link.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
