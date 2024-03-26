import z from 'zod';

const userSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID' }),
  name: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
  active: z.boolean(),
  token: z.string(),
  tokenExpired: z.date().optional()
});

export function validateUser (input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input);
}
