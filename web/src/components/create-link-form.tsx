import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'lucide-react';
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
    if (!data.originalUrl) {
      return;
    }

    await mutateAsync({
      originalUrl: data.originalUrl,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-300 px-4 py-3 transition focus-within:border-[#ef4444] focus-within:ring-4 focus-within:ring-red-100">
          <Link size={18} className="shrink-0 text-[#64748B]" />

          <input
            {...register('originalUrl')}
            placeholder="https://www.exemplo.com"
            className="w-full bg-transparent text-sm text-[#020817] outline-none placeholder:text-[#64748B]"
          />
        </div>

        {errors.originalUrl && (
          <p className="mt-2 text-sm text-[#ef4444]">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-[#ef4444] py-3 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? 'Encurtando...' : 'Criar link curto'}
      </button>
    </form>
  );
}
