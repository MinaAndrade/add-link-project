import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-[10px] uppercase leading-[14px] text-[#4D505C]">
            link original
          </span>
          <input
            {...register('originalUrl')}
            placeholder="www.exemplo.com.br"
            className="h-12 w-full rounded-lg border border-[#CDCFD5] bg-transparent px-4 text-sm leading-[18px] text-[#1F2025] outline-none transition placeholder:text-[#74798B] focus:border-[#2C46B1] focus:ring-4 focus:ring-[#2C46B1]/10"
          />

          {errors.originalUrl && (
            <p className="mt-2 text-xs text-[#B12C4D]">
              {errors.originalUrl.message}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-[10px] uppercase leading-[14px] text-[#4D505C]">
            link encurtado
          </span>
          <div className="flex h-12 w-full items-center rounded-lg border border-[#CDCFD5] bg-transparent px-4 text-sm leading-[18px] text-[#1F2025] transition focus-within:border-[#2C46B1] focus-within:ring-4 focus-within:ring-[#2C46B1]/10">
            <span className="shrink-0 text-[#74798B]">brev.ly/</span>
            <input
              {...register('shortCode')}
              placeholder="meu-link"
              className="min-w-0 flex-1 bg-transparent text-sm leading-[18px] text-[#1F2025] outline-none placeholder:text-[#74798B]"
            />
          </div>

          {errors.shortCode && (
            <p className="mt-2 text-xs text-[#B12C4D]">
              {errors.shortCode.message}
            </p>
          )}
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-lg bg-[#2C46B1] text-sm font-semibold leading-[18px] text-white transition hover:bg-[#253E9D] disabled:cursor-not-allowed disabled:bg-[#2C46B1]/50"
      >
        {isPending ? 'Salvando...' : 'Salvar link'}
      </button>
    </form>
  );
}
