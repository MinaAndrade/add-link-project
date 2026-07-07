import { useQuery } from '@tanstack/react-query';

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
          <th className="text-center">Ações</th>
        </tr>
      </thead>

      <tbody>
        {data.map(link => (
          <tr key={link.id} className="border-b transition hover:bg-gray-50">
            <td className="py-4">
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

            <td>{link.accessCount}</td>

            <td>
              <div className="flex justify-center gap-2">
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
