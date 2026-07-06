import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "../http/fetch-links";


export function LinksTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <table className="mt-8 w-full border-collapse">
      <thead>
        <tr>
          <th>Original</th>
          <th>Código</th>
          <th>Acessos</th>
        </tr>
      </thead>

      <tbody>
        {data.map((link: any) => (
          <tr key={link.id}>
            <td>{link.originalUrl}</td>
            <td>{link.shortCode}</td>
            <td>{link.accessCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}