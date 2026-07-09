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
        className="flex h-8 w-8 items-center justify-center rounded bg-[#E4E6EC] text-[#1F2025] transition hover:bg-[#D8DBE4] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        title="Excluir"
      >
        <Trash2 size={16} />
      </button>

      {isConfirmOpen && (
        <div className="absolute bottom-full right-0 z-30 mb-2 w-72 rounded-lg border border-[#E4E6EC] bg-white p-4 text-left shadow-xl shadow-slate-950/10">
          <p className="text-sm font-semibold text-[#1F2025]">Excluir link?</p>

          <p className="mt-1 text-xs leading-5 text-[#64748B]">
            Esta ação remove o link encurtado da lista.
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isPending}
              className="rounded border border-[#E4E6EC] px-3 py-2 text-xs font-medium text-[#1F2025] transition hover:bg-[#F9F9FB] disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded bg-[#B12C4D] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#92243F] disabled:opacity-60"
            >
              {isPending ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      )}

      {isTooltipVisible && (
        <div className="absolute right-full top-1/2 z-[9999] mr-2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded border border-[#E4E6EC] bg-white px-3 py-2 text-xs font-medium text-[#1F2025] shadow-lg shadow-slate-950/10">
          <Check size={14} className="text-[#2C46B1]" />
          Link excluído
        </div>
      )}
    </div>
  );
}
