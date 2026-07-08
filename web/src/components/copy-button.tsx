import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getApiUrl } from '../lib/api-url';

interface Props {
  shortCode: string;
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
    const url = getApiUrl(shortCode);

    await navigator.clipboard.writeText(url);

    setIsTooltipVisible(true);
  }

  return (
    <div className="relative flex justify-center">
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg p-2 text-[#64748B] transition hover:bg-slate-100 hover:text-[#020817] active:scale-95"
        title="Copiar link"
      >
        <Copy size={18} />
      </button>

      {isTooltipVisible && (
        <div className="absolute bottom-full left-1/2 z-20 mb-2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#020817] shadow-lg shadow-slate-950/10">
          <Check size={14} className="text-[#ef4444]" />
          Link copiado
        </div>
      )}
    </div>
  );
}
