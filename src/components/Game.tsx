import React, { useState, useEffect } from 'react';
import { GameButton } from './GameButton';
import { ResourceCounter } from './ResourceCounter';
import { Upgrade } from './Upgrade';
import { Shop } from './Shop';
import { ArrowLeft, Save } from 'lucide-react';
import { GameState } from '../types';

interface GameProps {
  initialState: GameState;
  onBack: () => void;
  onSave: (state: GameState) => void;
}

export function Game({ initialState, onBack, onSave }: GameProps) {
  const [resources, setResources] = useState(initialState.resources);
  const [autoClickerCount, setAutoClickerCount] = useState(initialState.autoClickerCount);
  const [multiplierCount, setMultiplierCount] = useState(initialState.multiplierCount);
  const [selectedSkin, setSelectedSkin] = useState(initialState.selectedSkin);
  const [purchasedItems, setPurchasedItems] = useState(initialState.purchasedItems);
  const [revenueMultiplier, setRevenueMultiplier] = useState(initialState.revenueMultiplier);

  // Exponential cost scaling
  const autoClickerCost = Math.floor(50 * Math.pow(1.25, autoClickerCount));
  const multiplierCost = Math.floor(200 * Math.pow(1.35, multiplierCount));
  
  // Base click power starts lower
  const baseClickPower = 1;
  const clickPower = baseClickPower * Math.pow(1.5, multiplierCount) * revenueMultiplier;
  const resourcesPerSecond = autoClickerCount * (clickPower / 2); // AutoClickers are half as effective

  useEffect(() => {
    const interval = setInterval(() => {
      setResources(prev => prev + resourcesPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [resourcesPerSecond]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentState: GameState = {
        resources,
        autoClickerCount,
        multiplierCount,
        selectedSkin,
        purchasedItems,
        revenueMultiplier,
        username: initialState.username
      };
      onSave(currentState);
    }, 60000);
    return () => clearInterval(interval);
  }, [resources, autoClickerCount, multiplierCount, selectedSkin, purchasedItems, revenueMultiplier]);

  const handleClick = () => {
    setResources(prev => prev + clickPower);
  };

  const buyAutoClicker = () => {
    if (resources >= autoClickerCost) {
      setResources(prev => prev - autoClickerCost);
      setAutoClickerCount(prev => prev + 1);
    }
  };

  const buyMultiplier = () => {
    if (resources >= multiplierCost) {
      setResources(prev => prev - multiplierCost);
      setMultiplierCount(prev => prev + 1);
    }
  };

  const handleShopPurchase = (item: any) => {
    if (resources >= item.cost && !purchasedItems.includes(item.id)) {
      setResources(prev => prev - item.cost);
      setPurchasedItems(prev => [...prev, item.id]);
      
      if (item.type === 'skin') {
        setSelectedSkin(item.id);
      } else if (item.type === 'upgrade' && item.multiplier) {
        setRevenueMultiplier(prev => prev * item.multiplier);
      }
    } else if (purchasedItems.includes(item.id) && item.type === 'skin') {
      setSelectedSkin(item.id);
    }
  };

  const handleManualSave = () => {
    const currentState: GameState = {
      resources,
      autoClickerCount,
      multiplierCount,
      selectedSkin,
      purchasedItems,
      revenueMultiplier,
      username: initialState.username
    };
    onSave(currentState);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Playing as: <span className="text-white font-semibold">{initialState.username}</span></span>
          <button
            onClick={handleManualSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Game
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <ResourceCounter 
          amount={Math.floor(resources)} 
          perSecond={resourcesPerSecond}
          clickPower={clickPower}
        />
        
        <div className="flex justify-center">
          <GameButton onClick={handleClick} skin={selectedSkin} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl text-white font-bold mb-4">Upgrades</h2>
            <Upgrade
              name="Auto Clicker"
              description="Automatically clicks every second at 50% efficiency"
              cost={autoClickerCost}
              count={autoClickerCount}
              canAfford={resources >= autoClickerCost}
              onClick={buyAutoClicker}
            />
            <Upgrade
              name="Click Multiplier"
              description="Increases click power by 50%"
              cost={multiplierCost}
              count={multiplierCount}
              canAfford={resources >= multiplierCost}
              onClick={buyMultiplier}
            />
          </div>

          <Shop
            resources={resources}
            onPurchase={handleShopPurchase}
            selectedSkin={selectedSkin}
            purchasedItems={purchasedItems}
          />
        </div>
      </div>
    </div>
  );
}