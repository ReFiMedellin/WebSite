import React from 'react';
import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { currencies } from '@/constants';
import { useNetwork } from 'wagmi';

function AnimatedPrice({ price }: { price: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const { chain } = useNetwork();
  const currentCurrency = currencies[chain?.id as keyof typeof currencies];
  useEffect(() => {
    const controls = animate(count, price);
    return controls.stop;
  }, [price]);
  return (
    <div className='text-2xl flex flex-row gap-1 font-bold'>
      $<motion.div>{rounded}</motion.div> {currentCurrency}
    </div>
  );
}

export default AnimatedPrice;
