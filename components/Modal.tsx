import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ children, show }: {children: React.ReactNode, show: boolean}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute top-0 bottom-0 left-0 right-0 z-50 ß backdrop-blur-md bg-gray-800 bg-opacity-50   flex justify-center items-center'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='p-4 rounded-lg flex flex-col w-11/12 gap-4 text-black bg-[#e3e3e3] sm:w-2/3 md:w-2/5 lg:w-3/6 xl:w-2/6 ' 
          >
         {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
