import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Trash2 } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { deleteLink } from '../http/delete-link';
import type { LinkId } from '../types/link';

interface Props {
  id: LinkId;
}

interface PopoverPosition {
  left: number;
  top: number;
}

const CONFIRM_POPOVER_WIDTH = 288;
const CONFIRM_POPOVER_HEIGHT = 142;
const VIEWPORT_GAP = 12;

export function DeleteButton({ id }: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] =
    useState<PopoverPosition | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    if (!isConfirmOpen) {
      return;
    }

    function updatePopoverPosition() {
      const button = buttonRef.current;

      if (!button) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const popoverHeight =
        popoverRef.current?.offsetHeight || CONFIRM_POPOVER_HEIGHT;
      const left = Math.min(
        Math.max(VIEWPORT_GAP, rect.right - CONFIRM_POPOVER_WIDTH),
        window.innerWidth - CONFIRM_POPOVER_WIDTH - VIEWPORT_GAP
      );
      const bottomTop = rect.bottom + 8;
      const top =
        bottomTop + popoverHeight > window.innerHeight - VIEWPORT_GAP
          ? rect.top - popoverHeight - 8
          : bottomTop;

      setPopoverPosition({
        left,
        top: Math.max(VIEWPORT_GAP, top),
      });
    }

    updatePopoverPosition();
    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition, true);

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition, true);
    };
  }, [isConfirmOpen]);

  useEffect(() => {
    if (!isConfirmOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsConfirmOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        popoverRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setIsConfirmOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isConfirmOpen]);

  async function handleDelete() {
    await mutateAsync(id);
    setIsConfirmOpen(false);
    setIsTooltipVisible(true);
  }

  const confirmPopover =
    isConfirmOpen &&
    createPortal(
      <div
        ref={popoverRef}
        className="fixed z-[9999] w-72 rounded-lg border border-border-subtle bg-white p-4 text-left shadow-xl shadow-slate-950/10"
        style={{
          left: popoverPosition?.left ?? -9999,
          top: popoverPosition?.top ?? -9999,
        }}
      >
        <p className="text-sm font-semibold text-content-strong">
          Excluir link?
        </p>

        <p className="mt-1 text-xs leading-5 text-content-muted">
          Esta ação remove o link encurtado da lista.
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsConfirmOpen(false)}
            disabled={isPending}
            className="rounded border border-border-subtle px-3 py-2 text-xs font-medium text-content-strong transition hover:bg-surface-card disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded bg-danger px-3 py-2 text-xs font-medium text-white transition hover:bg-danger-hover disabled:opacity-60"
          >
            {isPending ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="relative flex justify-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        disabled={isPending}
        className="flex h-8 w-8 items-center justify-center rounded bg-surface-canvas text-content-strong transition hover:bg-surface-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        title="Excluir"
      >
        <Trash2 size={16} />
      </button>

      {confirmPopover}

      {isTooltipVisible && (
        <div className="absolute right-full top-1/2 z-[9999] mr-2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded border border-border-subtle bg-white px-3 py-2 text-xs font-medium text-content-strong shadow-lg shadow-slate-950/10">
          <Check size={14} className="text-brand" />
          Link excluído
        </div>
      )}
    </div>
  );
}
