import { z } from "zod";

export const paymentSchema = z
  .object({
    eventId: z.string(),
    amount: z.number(),
  });
