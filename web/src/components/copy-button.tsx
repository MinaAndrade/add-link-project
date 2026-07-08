import { Copy } from 'lucide-react';

import { getApiUrl } from '../lib/api-url';

interface Props {
  shortCode: string;
}

export function CopyButton({ shortCode }: Props) {
  async function handleCopy() {
    const url = getApiUrl(shortCode);

    await navigator.clipboard.writeText(url);

    alert('Link copiado!');
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
      title="Copiar link"
    >
      <Copy size={18} />
    </button>
  );
}
