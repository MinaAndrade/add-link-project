import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { deleteLink } from '../http/delete-link';

interface Props {
  id: string;
}

export function DeleteButton({ id }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteLink,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['links'],
      });
    },
  });

  useEffect(() => {
    if (!isTooltipVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [isTooltipVisible]);

  async function handleDelete() {
    await mutateAsync(id);
    setIsConfirmOpen(false);
    setIsTooltipVisible(true);
  }

  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending}
        className="rounded-lg p-2 text-[#ef4444] transition hover:bg-red-50 hover:text-red-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        title="Excluir"
      >
        <Trash2 size={18} />
      </button>

      {isConfirmOpen && (
        <div className="absolute bottom-full right-0 z-30 mb-2 w-72 rounded-lg border border-slate-200 bg-white p-4 text-left shadow-xl shadow-slate-950/10">
          <p className="text-sm font-semibold text-[#020817]">Excluir link?</p>

          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Esta ação remove o link encurtado da lista.
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isPending}
              className="rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-[#020817] transition hover:bg-slate-50 disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-md bg-[#ef4444] px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
            >
              {isPending ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      )}

      {isTooltipVisible && (
        <div className="absolute bottom-full right-0 z-20 mb-2 flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#020817] shadow-lg shadow-slate-950/10">
          <Check size={14} className="text-[#ef4444]" />
          Link excluído
        </div>
      )}
    </div>
  );
}
