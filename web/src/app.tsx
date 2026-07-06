import { useRef } from "react";

import { CreateLinkForm } from "./components/create-link-form";
import { LinksTable } from "./components/links-table";

export function App() {
  const reloadRef = useRef<(() => void) | null>(null);

  return (
    <main className="mx-auto mt-16 max-w-5xl space-y-8">
      <h1 className="text-4xl font-bold">
        Encurtador de Links
      </h1>

      <CreateLinkForm
        onCreated={() => {
          reloadRef.current?.();
        }}
      />

      <LinksTable />
    </main>
  );
}