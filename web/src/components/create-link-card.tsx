import { CreateLinkForm } from './create-link-form';
import { Card } from './ui/card';

export function CreateLinkCard() {
  return (
    <Card>
      <div className="flex flex-col gap-5 sm:gap-6">
        <h2 className="text-lg font-bold leading-6 text-content-strong">
          Novo link
        </h2>

        <CreateLinkForm />
      </div>
    </Card>
  );
}
