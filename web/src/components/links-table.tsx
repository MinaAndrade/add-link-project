import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { fetchLinks } from '../http/fetch-links';
import { getApiUrl } from '../lib/api-url';

import { CopyButton } from './copy-button';
import { DeleteButton } from './delete-button';
import { EmptyState } from './empty-state';

export function LinksTable() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center rounded-lg border border-dashed border-slate-200 py-12">
        <p className="text-sm text-[#64748B]">Carregando links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">
          Não foi possível carregar os links.
        </p>

        <p className="mt-2 text-sm text-red-500">
          Verifique se a API está em execução.
        </p>
      </div>
    );
  }

  if (!data.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-[#64748B]">
            <th className="w-[48%] py-3 text-left">Destino</th>
            <th className="w-[24%] text-left">Link curto</th>
            <th className="w-[10%] text-center">Acessos</th>
            <th className="w-[12%] text-left">Criado em</th>
            <th className="w-[6%] text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map(link => (
            <tr
              key={link.id}
              className="border-b border-slate-100 transition hover:bg-slate-50"
            >
              <td className="max-w-[520px] truncate py-4 pr-8">
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[#020817] hover:text-[#ef4444]"
                >
                  {link.originalUrl}
                </a>
              </td>

              <td className="pr-8">
                <a
                  href={getApiUrl(link.shortCode)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-red-50 px-2.5 py-1.5 text-sm font-semibold text-[#ef4444] hover:bg-red-100"
                >
                  brev.ly/{link.shortCode}
                </a>
              </td>

              <td className="text-center">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-semibold text-[#020817]">
                  {link.accessCount}
                </span>
              </td>

              <td className="py-4 pr-4 text-sm text-[#64748B]">
                {dayjs(link.createdAt).format('DD/MM/YYYY')}
              </td>

              <td>
                <div className="flex justify-center gap-1">
                  <CopyButton shortCode={link.shortCode} />
                  <DeleteButton id={link.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
