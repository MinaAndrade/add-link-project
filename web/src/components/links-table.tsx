import { useEffect, useState } from "react";
import { fetchLinks } from "../http/fetch-links";

interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
}

export function LinksTable() {
  const [links, setLinks] = useState<Link[]>([]);

  async function loadLinks() {
    const data = await fetchLinks();

    setLinks(data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

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
        {links.map((link) => (
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