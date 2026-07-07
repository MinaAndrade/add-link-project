import { useQuery } from "@tanstack/react-query";

import { fetchLinks } from "../http/fetch-links";

import { CopyButton } from "./copy-button";
import { DeleteButton } from "./delete-button";

export function LinksTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return <p>Carregando links...</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-gray-500">
        Nenhum link cadastrado.
      </p>
    );
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
        {data.map((link) => (
          <tr
            key={link.id}
            className="border-b transition hover:bg-gray-50"
          >
            <td className="py-4">
              {link.originalUrl}
            </td>

            <td>{link.shortCode}</td>

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