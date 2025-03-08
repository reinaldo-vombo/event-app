// 'use client';
// import * as React from 'react';
// import { Button, ButtonProps } from '@/components/ui/button';
// import { motion, AnimatePresence } from 'framer-motion';
// import { cn } from '@/lib/utils';
// import { CircleCheck, Loader2, X } from 'lucide-react';

// // mock async code
// const useStatus = ({ resloveTo }: { resloveTo: 'success' | 'error' }) => {
//    const [status, setStatus] = React.useState('idle');
//    // mock async request
//    const onSubmit = () => {
//       setStatus('loading');

//    };

//    return {
//       onSubmit,
//       status,
//    };
// };
// interface SubmitButtonProps extends ButtonProps {
//    loading?: boolean; // Example of an extra prop you might want to pass
//    error?: boolean;
//    sucess?: boolean;
// }
// export function SubmitButton({ loading, error, ...rest }: SubmitButtonProps) {
//    const { status, onSubmit } = useStatus({ resloveTo: 'success' });
//    return (
//       <Button
//          disabled={loading}
//          onClick={onSubmit}
//          {...rest}
//          variant={loading ? 'destructive' : rest.variant}
//          className={cn('w-36 rounded-lg overflow-hidden', rest.className)}
//       >
//          <AnimatePresence mode="wait">
//             {/* //------------------------------IDLE */}
//             {!loading && (
//                <motion.span
//                   key={status}
//                   exit={{
//                      opacity: 0,
//                      y: -15,
//                      transition: { duration: 0.3, type: 'spring' },
//                   }}
//                >
//                   Publicar
//                </motion.span>
//             )}
//             {/* //------------------------------LOADING */}
//             {loading && (
//                <motion.span
//                   key={status}
//                   // initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
//                   exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
//                >
//                   <Loader2 className="animate-spin" size="19" />
//                </motion.span>
//             )}

//             {/* //------------------------------RESOLVED */}
//             {['success', 'error'].includes(status) && (
//                <motion.span
//                   key={status}
//                   // initial={{ opacity: 0, y: 15, scale: 0 }}
//                   animate={{
//                      opacity: 100,
//                      y: 0,
//                      scale: 1,
//                      transition: { delay: 0.1, duration: 0.4 },
//                   }}
//                   exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
//                >
//                   {error && <CircleCheck size="20" />}
//                   {status === 'error' && <X size="20" />}
//                </motion.span>
//             )}
//          </AnimatePresence>
//       </Button>
//    );
// }
