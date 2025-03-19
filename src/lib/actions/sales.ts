'use server';

import { z } from "zod";
import { paymentSchema } from "../validation/payment";
import { TState } from "../types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/config";
import { prisma } from "../db/client";

type FormData = z.infer<typeof paymentSchema>;
export async function byEventTicke(prevState: TState, data: FormData) {
   const session = await getServerSession(authOptions);
     if (!session) {
       return {
         error: true,
         ststus: 404,
         message: 'Não autorizado',
       };
     }
   const { amount, eventId } = data;
   try {
      await prisma.sale.create({
         data: {
            total: amount,
            eventId,
            buyerId: session.user.id
         }
      })
      return {
         success: true,
         status: 200,
         message: 'Compra efetuada com sucesso'
      }
   } catch (error) {
      if (error instanceof Error) {
        console.error(error.cause);
        console.log('Error: ', error.stack);
      }
      return {
        error: true,
        status: 500,
        message: 'Ocorreu um por-favor tente de novo',
      };
    }
}
