import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { createLink } from '../http/create-link';
import {
  type CreateLinkSchema,
  createLinkSchema,
} from '../types/create-link-schema';

export function CreateLinkForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });
  const hasShortCodeError = Boolean(errors.shortCode);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLink,

    async onSuccess() {
      reset();

      await queryClient.invalidateQueries({
        queryKey: ['links'],
      });
    },
  });

  async function onSubmit(data: CreateLinkSchema) {
    if (!data.originalUrl || !data.shortCode) {
      return;
    }

    await mutateAsync({
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <div className="flex w-full flex-col gap-4">
        <label className="flex w-full flex-col">
          <span className="mb-2 block text-[10px] uppercase leading-[14px] text-content-body">
            link original
          </span>
          <input
            {...register('originalUrl')}
            placeholder="www.exemplo.com.br"
            className="h-12 w-full rounded-lg border border-border-input bg-transparent px-4 text-sm leading-[18px] text-content-strong outline-none transition placeholder:text-content-muted focus:border-brand focus:ring-4 focus:ring-brand/10"
          />

          {errors.originalUrl && (
            <p className="mt-2 text-xs text-danger">
              {errors.originalUrl.message}
            </p>
          )}
        </label>

        <label className="flex w-full flex-col">
          <span
            className={`mb-2 block text-[10px] uppercase leading-[14px] ${
              hasShortCodeError ? 'text-danger' : 'text-content-body'
            }`}
          >
            link encurtado
          </span>
          <div
            className={`flex h-12 w-full items-center rounded-lg border bg-transparent px-4 text-sm leading-[18px] text-content-strong transition ${
              hasShortCodeError
                ? 'border-danger bg-surface-danger focus-within:ring-4 focus-within:ring-danger/10'
                : 'border-border-input focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10'
            }`}
          >
            <span
              className={`shrink-0 ${
                hasShortCodeError ? 'text-danger' : 'text-content-muted'
              }`}
            >
              brev.ly/
            </span>
            <input
              {...register('shortCode')}
              aria-invalid={hasShortCodeError}
              placeholder="meu-link"
              className="min-w-0 flex-1 bg-transparent text-sm leading-[18px] text-content-strong outline-none placeholder:text-content-muted"
            />
          </div>

          {errors.shortCode && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-danger">
              <AlertCircle size={14} className="shrink-0" />
              {errors.shortCode.message}
            </p>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-lg bg-brand text-sm font-semibold leading-[18px] text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-brand/50"
      >
        {isPending ? 'Salvando...' : 'Salvar link'}
      </button>
    </form>
  );
}
