import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../http/create-link";


export function CreateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!originalUrl.trim()) {
      return;
    }

    try {
      await mutateAsync({
        originalUrl,
      });

      setOriginalUrl("");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar o link.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        className="flex-1 rounded border p-3"
        placeholder="https://www.google.com"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <button
        type="submit"
        className="rounded bg-blue-600 px-6 text-white disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Criando..." : "Encurtar"}
      </button>
    </form>
  );
}