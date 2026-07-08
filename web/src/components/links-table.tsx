import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { fetchLinks } from '../http/fetch-links';

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
      <div className="flex justify-center py-12">
        <p className="text-gray-500">Carregando links...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center">
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
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b text-left text-sm text-gray-500">
          <th className="py-3 text-left">URL</th>
          <th className="text-left">Código</th>
          <th className="text-left">Acessos</th>
          <th className="text-left">Criado em</th>
          <th className="text-center">Ações</th>
        </tr>
      </thead>

      <tbody>
        {data.map(link => (
          <tr key={link.id} className="border-b transition hover:bg-gray-50">
            <td className="max-w-sm truncate">
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.originalUrl}
              </a>
            </td>

            <td>
              <a
                href={`http://localhost:3333/${link.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.shortCode}
              </a>
            </td>

            <td className="text-center">{link.accessCount}</td>

            <td className="py-4">
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
  );
}
