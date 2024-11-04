import React from 'react';
import { ShoppingBag, Paintbrush, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: JSX.Element;
  type: 'upgrade' | 'skin';
  multiplier?: number;
  preview?: string;
}

interface ShopProps {
  resources: number;
  onPurchase: (item: ShopItem) => void;
  selectedSkin: string;
  purchasedItems: string[];
}

const shopItems: ShopItem[] = [
  {
    id: 'revenue_1',
    name: 'Revenue Boost I',
    description: 'Multiplies all earnings by 2x',
    cost: 5000,
    icon: <Zap className="w-5 h-5" />,
    type: 'upgrade',
    multiplier: 2
  },
  {
    id: 'revenue_2',
    name: 'Revenue Boost II',
    description: 'Multiplies all earnings by 3x',
    cost: 25000,
    icon: <Zap className="w-5 h-5" />,
    type: 'upgrade',
    multiplier: 3
  },
  {
    id: 'revenue_3',
    name: 'Revenue Boost III',
    description: 'Multiplies all earnings by 5x',
    cost: 100000,
    icon: <Zap className="w-5 h-5" />,
    type: 'upgrade',
    multiplier: 5
  },
  {
    id: 'revenue_4',
    name: 'Ultimate Revenue',
    description: 'Multiplies all earnings by 10x',
    cost: 1000000,
    icon: <Zap className="w-5 h-5" />,
    type: 'upgrade',
    multiplier: 10
  },
  {
    id: 'skin_neon',
    name: 'Neon Pulse',
    description: 'A vibrant neon button skin',
    cost: 10000,
    icon: <Paintbrush className="w-5 h-5" />,
    type: 'skin',
    preview: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'skin_gold',
    name: 'Golden Touch',
    description: 'Premium golden button skin',
    cost: 50000,
    icon: <Paintbrush className="w-5 h-5" />,
    type: 'skin',
    preview: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
  }
];

export function Shop({ resources, onPurchase, selectedSkin, purchasedItems }: ShopProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6 text-white" />
        <h2 className="text-xl text-white font-bold">Shop</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {shopItems.map((item) => {
          const isPurchased = purchasedItems.includes(item.id);
          const isSelected = item.type === 'skin' && selectedSkin === item.id;
          const canAfford = resources >= item.cost;

          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className={`
                relative rounded-lg p-4
                ${isPurchased ? 'bg-gray-700' : canAfford ? 'bg-gray-600' : 'bg-gray-700 opacity-50'}
                ${isSelected ? 'ring-2 ring-indigo-500' : ''}
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>

              {item.type === 'skin' && item.preview && (
                <div className={`mt-3 h-8 w-full rounded-full ${item.preview}`}></div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span className="text-white font-bold">{item.cost.toLocaleString()} points</span>
                {isPurchased ? (
                  <span className="text-green-400 text-sm font-semibold">
                    {isSelected ? 'EQUIPPED' : 'PURCHASED'}
                  </span>
                ) : (
                  <button
                    onClick={() => canAfford && onPurchase(item)}
                    disabled={!canAfford}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-semibold
                      ${canAfford ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-700 text-gray-400'}
                    `}
                  >
                    Buy
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}