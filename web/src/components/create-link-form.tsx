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
        type="url"
        placeholder="https://www.google.com"
        value={originalUrl}
        onChange={(event) => setOriginalUrl(event.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "
      />

      <button
        type="submit"
        disabled={isPending}
        className="
          rounded-lg
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
          disabled:opacity-50
        "
      >
        {isPending ? "Criando..." : "Encurtar"}
      </button>
    </form>
  );
}