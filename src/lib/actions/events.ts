'use server';

import { z } from 'zod';
import { eventSchema } from '../validation/event';
import { TState } from '../types';

// import { writeFile, mkdir, access, constants, unlink } from 'fs/promises'; //uncomment this if want use local save  file
// import { join } from 'path';
// import { PATH } from '../helper';

type FormData = z.infer<typeof eventSchema>;
export async function createEvent(prevState: TState, data: FormData) {
  try {
    const file = data.thumbnail[0] as File;
    const fileUrl = await saveFile(file);

    // Step 2: Save images in the colors array
    // const updatedColors = [];
    // for (const galleryEntry of data?.gallery) {

    //   const savedImages = [];
    //   for (const imageFile of images as unknown as File[]) {
    //     try {
    //       const imageUrl = await saveFile(imageFile);
    //       savedImages.push(imageUrl);
    //     } catch (err) {
    //       console.error(`Failed to upload image for color ${color}`, err);
    //       return {
    //         error: {
    //           error: true,
    //           status: 404,
    //           message: `Failed to upload an image for color ${color}`,
    //         },
    //       };
    //     }
    //   }

    //   updatedColors.push({
    //     color,
    //     images: savedImages,
    //   });
    // }
  } catch (error) {
    console.error(error);
    return {
      error: true,
      status: 500,
      message: 'Ocorreu um erro ao cria o evento',
    };
  }
}

// Utility function to save the file in online
//  async function uploadToCloudinary(file: File): Promise<string> {
//    try {
//      const arrayBuffer = await file.arrayBuffer();
//      const buffer = Buffer.from(arrayBuffer);

//      return new Promise((resolve, reject) => {
//        const uploadStream = cloudinary.uploader.upload_stream(
//          { folder: 'shoes' }, // Optional: Organize files in a folder
//          (error, result) => {
//            if (error) {
//              console.error('Cloudinary upload error:', error);
//              reject(new Error('Failed to upload image to Cloudinary'));
//            } else {
//              resolve(result?.secure_url || '');
//            }
//          }
//        );

//        // Write the buffer to the Cloudinary upload stream
//        uploadStream.end(buffer);
//      });
//    } catch (error) {
//      console.error('Error in uploadToCloudinary:', error);
//      throw new Error('Failed to upload image to Cloudinary');
//    }
//  }

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
async function saveFile(file: File): Promise<string> {
  return uploadToCloudinary(file);
}
