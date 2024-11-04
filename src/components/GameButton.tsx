import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface GameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  skin: string;
}

const skinStyles = {
  default: 'bg-indigo-600 hover:bg-indigo-700',
  skin_neon: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  skin_gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700'
};

export function GameButton({ onClick, disabled, skin }: GameButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-32 h-32 rounded-full flex items-center justify-center shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${skinStyles[skin as keyof typeof skinStyles] || skinStyles.default}
      `}
    >
      <Sparkles className="w-12 h-12 text-white" />
    </motion.button>
  );
}