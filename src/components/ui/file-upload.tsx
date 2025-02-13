import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileRejection, useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const mainVariant = {
   initial: {
      x: 0,
      y: 0,
   },
   animate: {
      x: 20,
      y: -20,
      opacity: 0.9,
   },
};

const secondaryVariant = {
   initial: {
      opacity: 0,
   },
   animate: {
      opacity: 1,
   },
};
type TFileUploadProps = {
   formField: {
      value: File[] | undefined;
      onChange: (files: File[]) => void;
   };
   maxFiles?: number;
   multiple?: boolean;
}

export const FileUpload = ({ formField, maxFiles = 1, multiple = false }: TFileUploadProps) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [localFiles, setLocalFiles] = useState<File[]>(formField.value || []);


   // Sync form field value with local state when field.value changes
   useEffect(() => {
      setLocalFiles(formField.value || []);
   }, [formField.value]);

   const handleFileChange = (newFiles: File[]) => {
      const updatedFiles = [...localFiles, ...newFiles];
      setLocalFiles(updatedFiles); // Update local state for immediate UI feedback
      formField.onChange(updatedFiles); // Update form state
   };

   const handleClick = () => {
      fileInputRef.current?.click();
   };

   const { getRootProps, isDragActive, fileRejections, } = useDropzone({
      multiple: multiple,
      noClick: true,
      maxFiles: maxFiles,

      onDrop: handleFileChange,
      onDropRejected: (error) => {
         console.log(error);
      },
      accept: {
         'image/jpeg': [],
         'image/jpg': [],
         'image/png': [],
         'image/webp': [],
      }
   });
   const fileRejectionItems = fileRejections.map(({ file, errors }: FileRejection) => (
      <ul key={file.path}>
         <li>
            {file.path} - {file.size} bytes
            <ul>
               {errors.map((error: any) => (
                  <li key={error.code}>{error.message}</li>
               ))}
            </ul>
         </li>
      </ul>
   ));

   return (
      <div className="w-full" {...getRootProps()}>
         <motion.div
            whileHover="animate"
            className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
         >
            <input
               ref={fileInputRef}
               id="file-upload-handle"
               type="file"
               onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
               className="hidden"
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
               <GridPattern />
            </div>
            <div className="flex flex-col items-center justify-center">
               <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                  Carregar ficheiro
               </p>
               <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                  Arraste ou larga ficherios aqui ou clique para carregar
               </p>
               <div>{fileRejectionItems}</div>
               <div className="relative w-full mt-10 max-w-xl mx-auto">
                  {localFiles.length > 0 &&
                     localFiles.map((file, idx) => {
                        const previewUrl = URL.createObjectURL(file)
                        return (
                           <motion.div
                              key={"file" + idx}
                              layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                              className={cn(
                                 "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                 "shadow-sm"
                              )}
                           >
                              <button className="absolute top-0 left-0 size-6 flex items-center justify-center rounded-full z-10 bg-red-500" onClick={() => setLocalFiles((prev) => prev.filter(currentFile => currentFile.name !== file.name))}>
                                 <X className="size-4" />
                              </button>
                              <div className="flex justify-between w-full items-center gap-4">
                                 <motion.div className="relative size-12">
                                    <Image src={previewUrl} fill alt="preview" />
                                 </motion.div>
                                 <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                 >
                                    {file.name}
                                 </motion.p>
                                 <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                 >
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                 </motion.p>
                              </div>

                              <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                 <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                 >
                                    {file.type}
                                 </motion.p>

                                 <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                 >
                                    modified{" "}
                                    {new Date(file.lastModified).toLocaleDateString()}
                                 </motion.p>
                              </div>
                           </motion.div>
                        )
                     })}
                  {!localFiles.length && (
                     <motion.div
                        onClick={handleClick}
                        layoutId="file-upload"
                        variants={mainVariant}
                        transition={{
                           type: "spring",
                           stiffness: 300,
                           damping: 20,
                        }}
                        className={cn(
                           "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                           "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                        )}
                     >
                        {isDragActive ? (
                           <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-neutral-600 flex flex-col items-center"
                           >
                              Larga
                              <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                           </motion.p>
                        ) : (
                           <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                        )}
                     </motion.div>
                  )}

                  {!localFiles.length && (
                     <motion.div
                        variants={secondaryVariant}
                        className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                     ></motion.div>
                  )}
               </div>
            </div>
         </motion.div>
      </div>
   );
};

export function GridPattern() {
   const columns = 41;
   const rows = 11;
   return (
      <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
         {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: columns }).map((_, col) => {
               const index = row * columns + col;
               return (
                  <div
                     key={`${col}-${row}`}
                     className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                        ? "bg-gray-50 dark:bg-neutral-950"
                        : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                        }`}
                  />
               );
            })
         )}
      </div>
   );
}
