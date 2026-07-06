import { FormEvent, useState } from "react";
import { createLink } from "../http/create-link";

interface Props {
  onCreated: () => void;
}

export function CreateLinkForm({ onCreated }: Props) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!originalUrl.trim()) {
      return;
    }

    try {
      setLoading(true);

      await createLink({
        originalUrl,
      });

      setOriginalUrl("");

      onCreated();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        className="flex-1 rounded border p-3"
        placeholder="https://google.com"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <button
        className="rounded bg-blue-600 px-6 text-white"
        disabled={loading}
      >
        {loading ? "Criando..." : "Encurtar"}
      </button>
    </form>
  );
}