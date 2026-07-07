import { useQuery } from "@tanstack/react-query";

import { fetchLinks } from "../http/fetch-links";

export function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  if (error) {
    return <h1>Erro ao buscar links.</h1>;
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-4xl font-bold">
        Encurtador de Links
      </h1>

      <pre className="mt-8 rounded bg-gray-100 p-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}