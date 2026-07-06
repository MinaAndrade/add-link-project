import { Trash2, Copy } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchLinks } from "../http/fetch-links";
import { deleteLink } from "../http/delete-link";
import { Link } from "../http/types";

const queryClient = useQueryClient();

const { mutateAsync } = useMutation({
  mutationFn: deleteLink,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["links"],
    });
  },
});

async function handleDelete(id: string) {
  if (!confirm("Excluir este link?")) {
    return;
  }

  await mutateAsync(id);
}

async function handleCopy(shortCode: string) {
  await navigator.clipboard.writeText(
    `http://localhost:3333/${shortCode}`,
  );

  alert("Link copiado!");
}

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
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {data.map((link: Link) => (
          <tr key={link.id}>
            <td>{link.originalUrl}</td>
            <td>{link.shortCode}</td>
            <td>{link.accessCount}</td>
            <td>
                <div className="flex gap-2">
                    <button
                    onClick={() => handleCopy(link.shortCode)}
                    >
                    <Copy size={18} />
                    </button>

                    <button
                    onClick={() => handleDelete(link.id)}
                    >
                    <Trash2 size={18} />
                    </button>
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}