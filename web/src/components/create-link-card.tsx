import { Card } from './ui/card';
import { CreateLinkForm } from './create-link-form';

export function CreateLinkCard() {
  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Novo link</h2>

          <p className="text-sm text-gray-500">
            Informe a URL que deseja encurtar.
          </p>
        </div>

        <CreateLinkForm />
      </div>
    </Card>
  );
}
