import { useState, useEffect } from 'react';
import { GameState, Profile } from '../types';

const STORAGE_KEY = 'eclipse_game_profiles';

export function useGameState() {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveProfile = (username: string, gameState: GameState) => {
    const profile: Profile = {
      username,
      lastSaved: new Date().toISOString(),
      gameState
    };

    setProfiles(current => {
      const filtered = current.filter(p => p.username !== username);
      return [...filtered, profile];
    });
  };

  const loadProfile = (username: string): Profile | undefined => {
    return profiles.find(p => p.username === username);
  };

  const deleteProfile = (username: string) => {
    setProfiles(current => current.filter(p => p.username !== username));
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  return {
    profiles,
    saveProfile,
    loadProfile,
    deleteProfile
  };
}