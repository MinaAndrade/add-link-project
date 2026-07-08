import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { fetchLinks } from '../http/fetch-links';

import { CopyButton } from './copy-button';
import { DeleteButton } from './delete-button';
import { EmptyState } from './empty-state';

export function LinksTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return <div className="py-12 text-center">Carregando links...</div>;
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
          <th className="text-center">Abrir</th>
        </tr>
      </thead>

      <tbody>
        {data.map(link => (
          <tr
            key={link.id}
            className="border-b transition hover:bg-gray-50"
          >
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

            <td className="text-center">
              <a
                href={`http://localhost:3333/${link.shortCode}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200" >
                Abrir
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
