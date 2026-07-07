import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLink } from '../http/delete-link';

interface Props {
  id: string;
}

export function DeleteButton({ id }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteLink,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['links'],
      });
    },
  });

  async function handleDelete() {
    const confirmed = confirm('Deseja realmente excluir este link?');

    if (!confirmed) {
      return;
    }

    await mutateAsync(id);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg p-2 transition hover:bg-red-50 active:scale-95"
      title="Excluir"
    >
      <Trash2 size={18} className="text-red-600" />
    </button>
  );
}
