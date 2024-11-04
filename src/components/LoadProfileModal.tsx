import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Profile } from '../types';

interface LoadProfileModalProps {
  onClose: () => void;
  onLoad: (profile: Profile) => void;
  onDelete: (username: string) => void;
  profiles: Profile[];
}

export function LoadProfileModal({ onClose, onLoad, onDelete, profiles }: LoadProfileModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Load Profile</h2>

        {profiles.length === 0 ? (
          <p className="text-gray-400 text-center">No saved profiles found</p>
        ) : (
          <div className="space-y-3">
            {profiles.map((profile) => (
              <div
                key={profile.username}
                className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-white font-semibold">{profile.username}</h3>
                  <p className="text-gray-400 text-sm">
                    Last played: {new Date(profile.lastSaved).toLocaleDateString()}
                  </p>
                  <p className="text-indigo-400 text-sm">
                    Points: {profile.gameState.resources.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDelete(profile.username)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onLoad(profile)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Load
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}