import z from 'zod';

const AccountSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  initialMoney: z.number().nonnegative(),
  currency: z.string(),
  balance: z.number().nonnegative().default(0),
  description: z.string().nullable()
});

export function validateAccount (input) {
  return AccountSchema.safeParse(input);
}

export function validatePartialAccount (input) {
  return AccountSchema.partial().safeParse(input);
}
