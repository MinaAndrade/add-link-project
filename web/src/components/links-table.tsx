import { useQuery } from "@tanstack/react-query";

import { fetchLinks } from "../http/fetch-links";

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
        <tr className="border-b">
          <th className="py-3 text-left">URL</th>
          <th className="text-left">Código</th>
          <th className="text-left">Acessos</th>
        </tr>
      </thead>

      <tbody>
        {data.map((link) => (
          <tr
            key={link.id}
            className="border-b"
          >
            <td className="py-4">
              {link.originalUrl}
            </td>

            <td>{link.shortCode}</td>

            <td>{link.accessCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}