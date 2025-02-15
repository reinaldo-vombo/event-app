'use server';

import { z } from 'zod';
import { eventSchema } from '../validation/event';
import { TState } from '../types';
import cloudinary from '../storage/cloudinary';
import { prisma } from '../db/client';
import { revalidatePath } from 'next/cache';

// import { writeFile, mkdir, access, constants, unlink } from 'fs/promises'; //uncomment this if want use local save  file
// import { join } from 'path';
// import { PATH } from '../helper';

type FormData = z.infer<typeof eventSchema>;
export async function createEvent(prevState: TState, data: FormData) {
  if (!data.thumbnail || data.thumbnail.length === 0) {
    return {
      error: true,
      status: 400,
      message: 'Nenhum ficheiro carregado',
    };
  }
  try {
    const file = data.thumbnail[0] as File;
    const fileUrl = await saveFile(file);

    const updatedColors = [];
    for (const galleryEntry of data?.gallery ?? []) {
      const savedImages = [];
      for (const imageFile of galleryEntry as unknown as File[]) {
        try {
          const imageUrl = await saveFile(imageFile);
          savedImages.push(imageUrl);
        } catch (err) {
          console.error(`Failed to upload images `, err);
          return {
            error: {
              error: true,
              status: 404,
              message: `Failed to upload an images`,
            },
          };
        }
      }

      updatedColors.push({
        images: savedImages,
      });
    }
    await prisma.event.create({
      data: {
        ...data,
        thumbnail: fileUrl,
        gallery: {
          create: updatedColors,
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.cause);
      console.log('Error: ', error.stack);
    }
    return {
      error: true,
      status: 500,
      message: error,
    };
  }
}
export async function deleteProduct(prevState: TState, id: string) {
  if (!id) {
    return {
      error: true,
      message: 'Este produto não existe',
    };
  }

  try {
    // Step 1: Fetch the product from the database
    const event = await prisma.eventes.findUnique({
      where: { id },
    });

    if (!event) {
      return {
        error: true,
        message: 'Produto não encontrado',
      };
    }

    //function to delete an image from Cloudinary
    async function deleteFromCloudinary(publicId: string) {
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted from Cloudinary: ${publicId}`, result);
      } catch (err) {
        console.error(`Failed to delete from Cloudinary: ${publicId}`, err);
      }
    }

    //Delete the main product image from Cloudinary
    if (product.) {
      const publicId = extractPublicId(product.image); // Extract the public ID
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    //Delete images in the nested `images` JSON structure
    if (product.images && Array.isArray(product.images)) {
      const imagesArray = product.images as ProductImage[];
      for (const colorEntry of imagesArray) {
        const { images } = colorEntry;

        if (images && Array.isArray(images)) {
          for (const imagePath of images) {
            if (imagePath) {
              const publicId = extractPublicId(imagePath); // Extract the public ID
              if (publicId) {
                await deleteFromCloudinary(publicId);
              }
            }
          }
        }
      }
    }

    //Delete the product from the database
    await prisma.products.delete({
      where: { id },
    });

    revalidatePath('/');
    return {
      success: true,
      message: 'Produto excluir com sucesso',
    };
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    return {
      error: true,
      message: 'Erro ao excluir o produto',
    };
  }
}

//helper
function extractPublicId(url: string): string | null {
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const [publicId] = filename.split('.'); // Remove the file extension
    return parts.includes('image') ? `images/${publicId}` : publicId;
  } catch (error) {
    console.error('Failed to extract public ID:', error);
    return null;
  }
}
//Utility function to save the file in online
async function uploadToCloudinary(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'events' }, // Optional: Organize files in a folder
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            resolve(result?.secure_url || '');
          }
        }
      );

      // Write the buffer to the Cloudinary upload stream
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}
async function saveFile(file: File): Promise<string> {
  return uploadToCloudinary(file);
}
// Utility function to save the file in local folder if your working offline
// async function saveFileLocally(file: File): Promise<string> {
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadDir = join(process.cwd(), 'uploads');
//   try {
//     await access(uploadDir, constants.F_OK);
//   } catch {
//     await mkdir(uploadDir, { recursive: true });
//   }

//   const filePath = join(uploadDir, file.name);
//   await writeFile(filePath, buffer);

//   return `${PATH}${file.name}`;
// }

// Utility function to save the file
