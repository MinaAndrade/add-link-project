import { CreateLinkForm } from './create-link-form';
import { Card } from './ui/card';

export function CreateLinkCard() {
  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[#020817]">Novo link</h2>

          <p className="mt-1 text-sm text-[#64748B]">
            Informe a URL original para gerar um link brev.ly.
          </p>
        </div>

        <CreateLinkForm />
      </div>
    </Card>
  );
}
