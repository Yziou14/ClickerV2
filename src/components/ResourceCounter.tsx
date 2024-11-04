import React from 'react';
import { motion } from 'framer-motion';

interface ResourceCounterProps {
  amount: number;
  perSecond: number;
  clickPower: number;
}

export function ResourceCounter({ amount, perSecond, clickPower }: ResourceCounterProps) {
  return (
    <div className="text-center space-y-2">
      <motion.div
        key={amount}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-4xl font-bold text-white">{amount.toLocaleString()}</span>
      </motion.div>
      <div className="flex justify-center gap-4 text-sm">
        <p className="text-gray-400">+{perSecond.toFixed(1)}/sec</p>
        <p className="text-gray-400">+{clickPower.toFixed(1)}/click</p>
      </div>
    </div>
  );
}