import React from 'react';

interface UpgradeProps {
  name: string;
  cost: number;
  count: number;
  canAfford: boolean;
  onClick: () => void;
}

export function Upgrade({ name, cost, count, canAfford, onClick }: UpgradeProps) {
  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`w-full p-4 rounded-lg flex items-center justify-between
        ${canAfford ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 opacity-75'}
        transition-all duration-300`}
    >
      <div className="text-left">
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm">Owned: {count}</p>
      </div>
      <span className="text-white font-bold">{cost.toLocaleString()}</span>
    </button>
  );
}