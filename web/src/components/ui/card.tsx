import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}