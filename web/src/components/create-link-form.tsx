import { type FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLink } from "../http/create-link";

export function CreateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("");

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLink,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });

      setOriginalUrl("");
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!originalUrl.trim()) {
      return;
    }

    await mutateAsync({
      originalUrl,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4"
    >
      <input
        className="flex-1 rounded-lg border p-3"
        placeholder="https://google.com"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        {isPending ? "Criando..." : "Encurtar"}
      </button>
    </form>
  );
}