import * as z from 'zod';

export const eventSchema = z
  .object({
    title: z.string().min(2, {
      message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(10, {
      message: 'Description must be at least 10 characters.',
    }),
    slug: z
      .string()
      .min(2, {
        message: 'Slug must be at least 2 characters.',
      })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must be lowercase letters, numbers, and hyphens only.',
      }),
    thumbnail: z.array(z.instanceof(File)).nonempty({
      message: 'Deve carregar uma imagem',
    }),
    gallery: z.array(z.instanceof(File)).optional(),
    category: z.string().nonempty({
      message: 'Deve adicionar uma categoria',
    }),
    tags: z.array(z.string()).nonempty({
      message: 'Deve adicionar pelo menos uma categoria',
    }),
    guests: z
      .array(
        z.object({
          url: z.string().url('Please enter a valid URL').optional(),
          name: z.string(),
          avatar: z.string(),
        })
      )
      .optional(),
    price: z.array(
      z.object({
        title: z.string().min(3, {
          message: 'Titlo deve ter no minimo 3 caracteres',
        }),
        price: z.string(),
      })
    ),
    status: z.string().nonempty({
      message: 'Selecione uma das opções',
    }),
    tickets: z.string().optional(),
    location: z.object({
      latitude: z.number({ required_error: 'Latitude is required.' }),
      longitude: z.number({ required_error: 'Longitude is required.' }),
    }),
    startDate: z.date({
      required_error: 'Please select a start date.',
    }),
    endDate: z
      .date({
        required_error: 'Please select an end date.',
      })
      .optional(),
  })
  .refine((data) => data.endDate && data.endDate >= data.startDate, {
    message: 'End date must be after start date.',
    path: ['endDate'],
  });
