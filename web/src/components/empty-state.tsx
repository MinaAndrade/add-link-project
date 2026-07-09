import { Link2 } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex min-h-[102px] flex-col items-center justify-center gap-3 border-t border-[#E4E6EC] py-4 text-center">
      <div className="text-[#74798B]">
        <Link2 size={32} strokeWidth={1.75} />
      </div>

      <p className="text-[10px] uppercase leading-[14px] text-[#4D505C]">
        ainda nao existem links cadastrados
      </p>
    </div>
  );
}
