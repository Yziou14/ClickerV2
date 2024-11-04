import React, { useState } from 'react';
import { Play, Settings, Trophy, Volume2, VolumeX, HelpCircle, User } from 'lucide-react';
import { Game } from './components/Game';
import { ProfileModal } from './components/ProfileModal';
import { LoadProfileModal } from './components/LoadProfileModal';
import { useGameState } from './hooks/useGameState';
import { GameState } from './types';

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [showLoadProfile, setShowLoadProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<GameState | null>(null);
  const { profiles, saveProfile, deleteProfile } = useGameState();

  const handleNewProfile = (username: string) => {
    const initialState: GameState = {
      resources: 0,
      autoClickerCount: 0,
      multiplierCount: 0,
      selectedSkin: 'default',
      purchasedItems: ['default'],
      revenueMultiplier: 1,
      username
    };
    setCurrentProfile(initialState);
    setShowNewProfile(false);
    setIsPlaying(true);
  };

  const handleLoadProfile = (profile: { gameState: GameState }) => {
    setCurrentProfile(profile.gameState);
    setShowLoadProfile(false);
    setIsPlaying(true);
  };

  const handleSaveAndExit = (gameState: GameState) => {
    if (gameState.username) {
      saveProfile(gameState.username, gameState);
    }
    setIsPlaying(false);
    setCurrentProfile(null);
  };

  if (isPlaying && currentProfile) {
    return (
      <Game
        initialState={currentProfile}
        onBack={() => handleSaveAndExit(currentProfile)}
        onSave={(state) => saveProfile(state.username, state)}
      />
    );
  }

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-wider">ECLIPSE</h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">Enter the void</p>
        </div>

        <div className="space-y-4 mt-12">
          <button 
            onClick={() => setShowNewProfile(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-lg flex items-center justify-between group transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            <span className="flex-grow text-center text-lg font-semibold">New Game</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </button>

          <button 
            onClick={() => setShowLoadProfile(true)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between group transition-all duration-300"
          >
            <User className="w-5 h-5" />
            <span className="flex-grow text-center text-lg">Load Game</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </button>

          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between group transition-all duration-300">
            <Trophy className="w-5 h-5" />
            <span className="flex-grow text-center text-lg">Leaderboard</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </button>

          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between group transition-all duration-300">
            <Settings className="w-5 h-5" />
            <span className="flex-grow text-center text-lg">Settings</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
          </button>
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-300"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          
          <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-300">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">Version 1.0.0</p>
        </div>
      </div>

      {showNewProfile && (
        <ProfileModal
          onClose={() => setShowNewProfile(false)}
          onSave={handleNewProfile}
          existingProfiles={profiles.map(p => p.username)}
        />
      )}

      {showLoadProfile && (
        <LoadProfileModal
          onClose={() => setShowLoadProfile(false)}
          onLoad={handleLoadProfile}
          onDelete={deleteProfile}
          profiles={profiles}
        />
      )}
    </div>
  );
}

export default App;