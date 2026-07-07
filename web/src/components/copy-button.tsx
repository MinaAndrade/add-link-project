import { Copy } from "lucide-react";

interface Props {
  shortCode: string;
}

export function CopyButton({ shortCode }: Props) {
  async function handleCopy() {
    const url = `http://localhost:3333/${shortCode}`;

    await navigator.clipboard.writeText(url);

    alert("Link copiado!");
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded p-2 transition hover:bg-gray-100"
      title="Copiar link"
    >
      <Copy size={18} />
    </button>
  );
}