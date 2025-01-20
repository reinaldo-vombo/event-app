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
    url: z.string().url().optional(),
    guests: z.array(
      z.object({
        url: z.string().url("Please enter a valid URL"),
        name: z.string().optional(),
        avatar: z.string().optional(),
      })
    ).optional(),
    latitude: z.number({ required_error: "Latitude is required." }),
    longitude: z.number({ required_error: "Longitude is required." }),
    startDate: z.date({
      required_error: 'Please select a start date.',
    }),
    endDate: z.date({
      required_error: 'Please select an end date.',
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date.',
    path: ['endDate'],
  });
