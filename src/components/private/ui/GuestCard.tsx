"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MicOff, X } from "lucide-react";
import { useState } from "react";

const initialCallUsers = [
   {
      name: "Le Baller",
      role: "CEO",
      image: "/avatar.jpg",
      id: 1,
   },
   {
      name: "Romanus",
      role: "Backend lead",
      image: "/avatar.jpg",
      id: 2,
   },
   {
      name: "Frozen bird",
      role: "Project manager",
      image: "/avatar.jpg",
      id: 3,
   },
   {
      name: "The !nvestor",
      role: "!nvestor",
      image: "/avatar.jpg",
      id: 4,
   },
];

type Status = "idle" | "open" | "hovered";

const springTransition = {
   type: "spring",
   stiffness: 260,
   damping: 20,
};

const GuesViewer = () => {
   const [status, setStatus] = useState<Status>("idle");
   const [callUsers, setCallUsers] = useState(initialCallUsers); // Manage user state
   const isOpen = status === "open";

   const removeUser = (id: number) => {
      setCallUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
   };

   const renderUserProfiles = (stacked?: boolean, details?: boolean) =>
      callUsers.map((user) => (
         <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-5">
               <motion.div
                  layoutId={`userprofile-${user.id}`}
                  className={cn(
                     "size-14 rounded-full border-4 border-white dark:border-black border-b",
                     {
                        "-ml-3": stacked,
                     }
                  )}
                  style={{
                     backgroundImage: `url(${user.image || "default_image.jpg"})`,
                     backgroundSize: "cover",
                  }}
               />
               {details && (
                  <div className="flex flex-col gap-1">
                     <motion.h1
                        layoutId={`username-${user.id}`}
                        className="font-bold text-black dark:text-white"
                     >
                        {user.name}
                     </motion.h1>
                     <motion.p
                        layoutId={`userrole-${user.id}`}
                        className="text-muted-foreground text-sm"
                     >
                        {user.role}
                     </motion.p>
                  </div>
               )}
            </div>
            {details && (
               <button
                  onClick={() => removeUser(user.id)} // Call removeUser function
                  className="border-red-500 border bg-red-100 text-red-500 text-sm p-1 rounded font-semibold"
               >
                  Remove {user.name} from call
               </button>
            )}
         </div>
      ));

   return (
      <div className="size-full rounded-lg relative w-full center border-t border bg-muted">
         <motion.div
            className="flex gap-5 flex-col cursor-pointer bg-white dark:bg-black shadow-md text-primary-foreground p-5 tracking-tight overflow-hidden"
            aria-expanded={isOpen}
            layout
            role="button"
            style={{ borderRadius: 22 }}
            tabIndex={0}
            onKeyDown={(e) => {
               if (e.key === "Enter") setStatus(isOpen ? "idle" : "open");
            }}
         >
            <AnimatePresence>
               {isOpen && (
                  <motion.div
                     initial={{ maxHeight: 0 }}
                     animate={{ maxHeight: 1000 }}
                     exit={{ maxHeight: 0 }}
                     transition={{ duration: 0.5, ease: "easeInOut" }}
                     className="flex flex-col gap-5 overflow-hidden"
                  >
                     {renderUserProfiles(false, true)}
                  </motion.div>
               )}
            </AnimatePresence>

            <motion.div
               onClick={() => setStatus(isOpen ? "idle" : "open")}
               className="flex items-center justify-between"
            >
               <div className="flex flex-col gap-2">
                  <motion.h1
                     layoutId="call-company"
                     className="font-bold text-black dark:text-white text-3xl"
                  >
                     Speakers
                  </motion.h1>
               </div>
               <AnimatePresence>
                  {!isOpen ? (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex"
                     >
                        {renderUserProfiles(true)}
                     </motion.div>
                  ) : (
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={springTransition}
                        className="flex gap-2"
                     >
                        <motion.button
                           layout
                           onClick={() => setStatus("idle")}
                           className="size-6 flex items-center justify-center rounded-full bg-muted"
                        >
                           <X className="size-4 text-tight text-secondary-foreground" />
                        </motion.button>
                        <motion.button
                           layout
                           onClick={() => setStatus("idle")}
                           className="size-6 flex items-center justify-center rounded-full bg-muted"
                        >
                           <MicOff className="size-4 text-tight text-secondary-foreground" />
                        </motion.button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
         </motion.div>
      </div>
   );
};

export default GuesViewer;
