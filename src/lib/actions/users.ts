'use server';

import { z } from 'zod';
import { TState } from '../types';
import { registerSchema, updatedUserSchema } from '../validation/user';
import { prisma } from '../db/client';
import { compare, hash } from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/config';
import { writeFile, mkdir, access, constants } from 'fs/promises';
import { join } from 'path';
import { PATH } from '@/constant/static-content';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcrypt';

type FormData = z.infer<typeof registerSchema>;
type UpdateFormData = z.infer<typeof updatedUserSchema>;
// type PasswordFormData = z.infer<typeof updatedPassworSchema>;

export async function registerUser(prevState: TState, data: FormData) {
  const { name, email, userName, confirmPassword, password } = data;

  if (password !== confirmPassword) {
    return {
      error: true,
      status: 403,
      message: 'As palavra-passe não condizem',
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        username: userName,
      },
    });
    return {
      success: true,
      status: 200,
      message: 'Conta criada',
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.cause);
      console.log('Error: ', error.stack);
    }
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro por-favor tente de novo',
    };
  }
}
export async function updateUser(prevState: TState, data: UpdateFormData) {
  const { name, email, userName, avatar } = data;
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: true,
      status: 404,
      message: 'Não autorizado',
    };
  }
  let fileUrl;
  const file = avatar && (avatar[0] as File);
  if (file) {
    fileUrl = await saveFile(file);
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
        password: session.user.password,
        email,
        image: fileUrl,
        username: userName,
      },
    });
    revalidatePath('/');
    return {
      success: true,
      status: 200,
      message: 'A sua conta foi atualizada',
    };
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
export async function updatePassword(prevState: TState, data: UpdateFormData) {
  const { name, email, userName, new_password, old_password } = data;
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: true,
      status: 404,
      message: 'Não autorizado',
    };
  }
  if (!old_password || !new_password) {
    return {
      error: true,
      status: 404,
      message: 'Preecha todos os campos',
    };
  }
  const isPasswordValid = await compare(old_password, session.user.password);
  if (!isPasswordValid) {
    return {
      error: true,
      status: 404,
      message: 'Palavra-passe Errada',
    };
  }
  const hashedPassword = await hash(new_password, 10);
  try {
    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: {
        name,
        password: hashedPassword,
        email,
        username: userName,
      },
    });
    return {
      success: true,
      status: 200,
      message: 'Palavra-passe atualizada',
    };
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
async function saveFile(file: File): Promise<string> {
  // return uploadToCloudinary(file);
  return saveFileLocally(file);
}
async function saveFileLocally(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), 'uploads');
  try {
    await access(uploadDir, constants.F_OK);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  return `${PATH}${file.name}`;
}
