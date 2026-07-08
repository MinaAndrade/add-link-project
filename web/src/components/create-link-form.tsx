import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createLink } from '../http/create-link';
import {
  createLinkSchema,
  type CreateLinkSchema,
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
    await mutateAsync(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('originalUrl')}
          placeholder="https://www.google.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-3"
        />

        {errors.originalUrl && (
          <p className="mt-2 text-sm text-red-500">
            {errors.originalUrl.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="
          w-full
          rounded-lg
          bg-blue-600
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        {isPending ? 'Encurtando...' : 'Encurtar Link'}
      </button>
    </form>
  );
}
