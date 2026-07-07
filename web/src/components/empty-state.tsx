import { Link2 } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Link2 className="mb-4 text-gray-400" size={48} />

      <h3 className="text-lg font-semibold">Nenhum link cadastrado</h3>

      <p className="mt-2 text-sm text-gray-500">
        Cadastre seu primeiro link utilizando o formulário acima.
      </p>
    </div>
  );
}
