import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  rememberMe: z.boolean().default(false).optional(),
});
export const registerSchema = z.object({
  name: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  userName: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  role: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string().min(5, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const updatedUserSchema = z.object({
  name: z.string().min(2, {
    message: 'Deve adicionar o seu nome',
  }),
  userName: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  avatar: z.array(z.instanceof(File)).optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
      name: z.string().optional(),
    })
    .optional(),
  old_password: z
    .string()
    .min(5, {
      message: 'Password must be at least 8 characters.',
    })
    .optional(),
  new_password: z
    .string()
    .min(5, {
      message: 'Password must be at least 8 characters.',
    })
    .optional(),
});
export const updatedPassworSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  name: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  userName: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  role: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  old_password: z.string().min(5, {
    message: 'Password must be at least 8 characters.',
  }),
  new_password: z.string().min(5, {
    message: 'Password must be at least 8 characters.',
  }),
});
