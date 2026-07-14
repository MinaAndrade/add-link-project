import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';

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
          Nao foi possivel carregar os links.
        </p>

        <p className="mt-2 text-sm text-content-body">
          Verifique se a API esta em execucao.
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
    <div className="max-h-[280px] overflow-y-auto border-t border-border-subtle">
      {data.map(link => (
        // `id` identifies the database record for mutations; `shortCode` is the public route used for navigation/copying.
        <div
          key={link.id}
          className="grid grid-cols-1 gap-3 border-b border-border-subtle py-4 last:border-b-0 sm:grid-cols-[minmax(0,347px)_61px_68px] sm:items-center sm:gap-5"
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

          <span className="text-xs leading-4 text-content-body sm:text-right">
            {getAccessLabel(link.accessCount)}
          </span>

          <div className="flex gap-1">
            <CopyButton shortCode={link.shortCode} />
            <DeleteButton id={link.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
