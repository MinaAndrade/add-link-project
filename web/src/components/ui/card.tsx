import type { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="rounded-lg bg-surface-card p-6 sm:p-card">{children}</div>
  );
}
