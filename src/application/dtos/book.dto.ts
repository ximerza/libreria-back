import { z } from 'zod';

export const CreateBookDto = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  author: z.string().min(1, 'El autor es obligatorio'),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
});

export const UpdateBookDto = CreateBookDto.partial();

export type CreateBookInput = z.infer<typeof CreateBookDto>;
export type UpdateBookInput = z.infer<typeof UpdateBookDto>;
