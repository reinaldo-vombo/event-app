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
    tags: z.array(z.string()).optional(),
    guests: z
      .array(
        z.object({
          name: z.string(),
          avatar: z.array(z.instanceof(File)),
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
      lat: z.number({ required_error: 'Latitude is required.' }),
      lng: z.number({ required_error: 'Longitude is required.' }),
      name: z.string().optional(),
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
export const updateEventSchema = z
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
    thumbnail: z.union([
      z.string(), // For existing image URL
      z
        .array(z.instanceof(File))
        .nonempty({ message: 'Deve carregar uma imagem' }),
    ]),
    gallery: z.union([
      z.array(z.string()), // For existing image URL
      z.array(z.instanceof(File)).optional(),
    ]),
    category: z.string().nonempty({
      message: 'Deve adicionar uma categoria',
    }),
    tags: z.array(z.string()).optional(),
    guests: z
      .array(
        z.object({
          name: z.string(),
          avatar: z.union([
            z.string(), // For existing image URL
            z
              .array(z.instanceof(File))
              .nonempty({ message: 'Deve carregar uma imagem' }),
          ]),
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
      lat: z.number({ required_error: 'Latitude is required.' }),
      lng: z.number({ required_error: 'Longitude is required.' }),
      name: z.string().optional(),
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
