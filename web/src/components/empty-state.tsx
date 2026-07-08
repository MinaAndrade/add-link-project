import { Link2 } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-red-50 text-[#ef4444]">
        <Link2 size={30} />
      </div>

      <h3 className="text-lg font-semibold text-[#020817]">
        Nenhum link cadastrado
      </h3>

      <p className="mt-2 max-w-sm text-sm text-[#64748B]">
        Crie seu primeiro link curto para acompanhar acessos e gerar relatórios.
      </p>
    </div>
  );
}
