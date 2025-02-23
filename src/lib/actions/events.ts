'use server';

import { z } from 'zod';
import { eventSchema } from '../validation/event';
import { TState } from '../types';
import cloudinary from '../storage/cloudinary';
import { prisma } from '../db/client';
import { revalidatePath } from 'next/cache';
import { PATH } from '@/constant/static-content';

import { writeFile, mkdir, access, constants } from 'fs/promises'; //uncomment this if want use local save  file
import { join } from 'path';

type FormData = z.infer<typeof eventSchema>;

export async function createEvent(prevState: TState, data: FormData) {
  const { guests } = data;
  if (!data.thumbnail || data.thumbnail.length === 0) {
    return {
      error: true,
      status: 400,
      message: 'Nenhum ficheiro carregado',
    };
  }
  const file = data.thumbnail[0] as File;
  const fileUrl = await saveFile(file);

  const updatedImages: any = [];
  for (const galleryEntry of data?.gallery ?? []) {
    if (!Array.isArray(galleryEntry)) {
      continue;
    }
    const savedImages = [];
    for (const imageFile of galleryEntry as unknown as File[]) {
      try {
        const imageUrl = await saveFile(imageFile);
        savedImages.push([imageUrl]);
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

    updatedImages.push({
      images: savedImages,
    });
  }
  async function processGuestImages(guests: any[]) {
    const guestsImages: { name: string; avatar: string }[] = [];

    for (const guestEntry of guests ?? []) {
      const { name, avatar } = guestEntry;

      if (!name || avatar.length === 0) continue;

      try {
        // Upload all avatars in parallel
        const savedImages = await Promise.all(
          avatar.map(async (imageFile: any) => await saveFile(imageFile))
        );

        guestsImages.push({
          name,
          avatar: savedImages[0], // Assuming you only want the first image
        });
      } catch (err) {
        console.error(`Failed to upload images for guest ${name}:`, err);
        throw new Error(`Failed to upload images for guest ${name}`);
      }
    }

    return guestsImages;
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const event = await tx.event.create({
          data: {
            title: data.title,
            description: data.description,
            thumbnail: fileUrl,
            slug: data.slug,
            tickets: data.tickets || '',
            category: data.category,
            latitude: data.location.lat,
            longitude: data.location.lng,
            locationName: data.location.name || '',
            tags: data.tags,
            organizerId: '12345677',
            status: data.status,
            startDate: data.startDate,
            endDate: data.endDate,
            gallery: updatedImages,
          },
        });
        if (guests && guests.length > 0) {
          const processedGuests = await processGuestImages(guests);

          if (processedGuests.length > 0) {
            await tx.guest.createMany({
              data: processedGuests.map((guest) => ({
                name: guest.name,
                avatar: guest.avatar,
                eventId: event.id,
              })),
            });
          }
        }
      },
      {
        maxWait: 5000, // 5 seconds max wait to connect to prisma
        timeout: 20000, // 20 seconds
      }
    );
    return {
      success: true,
      message: 'Evento criado com sucesso',
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
export async function deleteProduct(prevState: TState, id: string) {
  if (!id) {
    return {
      error: true,
      message: 'Este produto não existe',
    };
  }

  try {
    // Step 1: Fetch the product from the database
    const event = await prisma.event.findUnique({
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
    if (event.thumbnail) {
      const publicId = extractPublicId(event.thumbnail); // Extract the public ID
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    //Delete images in the nested `images` JSON structure
    if (event.gallery && Array.isArray(event.gallery)) {
      const imagesArray = event.gallery as any[];
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
    await prisma.event.delete({
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
// async function uploadToCloudinary(file: File): Promise<string> {
//   try {
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     return new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: 'events' }, // Optional: Organize files in a folder
//         (error, result) => {
//           if (error) {
//             console.error('Cloudinary upload error:', error);
//             reject(new Error('Failed to upload image to Cloudinary'));
//           } else {
//             resolve(result?.secure_url || '');
//           }
//         }
//       );

//       // Write the buffer to the Cloudinary upload stream
//       uploadStream.end(buffer);
//     });
//   } catch (error) {
//     console.error('Error in uploadToCloudinary:', error);
//     throw new Error('Failed to upload image to Cloudinary');
//   }
// }
async function saveFile(file: File): Promise<string> {
  // return uploadToCloudinary(file);
  return saveFileLocally(file);
}
// Utility function to save the file in local folder if your working offline
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

// Utility function to save the file
