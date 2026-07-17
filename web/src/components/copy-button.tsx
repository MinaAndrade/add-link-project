import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getFrontendUrl } from '../lib/frontend-url';
import type { ShortCode } from '../types/link';

interface Props {
  shortCode: ShortCode;
}

export function CopyButton({ shortCode }: Props) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (!isTooltipVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [isTooltipVisible]);

  async function handleCopy() {
    const url = getFrontendUrl(shortCode);

    await navigator.clipboard.writeText(url);

    setIsTooltipVisible(true);
  }

  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-8 w-8 items-center justify-center rounded bg-surface-canvas text-content-strong transition hover:bg-surface-hover active:scale-95"
        title="Copiar link"
      >
        <Copy size={16} />
      </button>

      {isTooltipVisible && (
        <div className="absolute right-full top-1/2 z-[9999] mr-2 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded border border-border-subtle bg-white px-3 py-2 text-xs font-medium text-content-strong shadow-lg shadow-slate-950/10">
          <Check size={14} className="text-brand" />
          Link copiado
        </div>
      )}
    </div>
  );
}
