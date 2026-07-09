import type { PropsWithChildren } from 'react';

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-lg bg-[#F9F9FB] p-8">{children}</div>;
}
