export interface GameState {
  resources: number;
  autoClickerCount: number;
  multiplierCount: number;
  selectedSkin: string;
  purchasedItems: string[];
  revenueMultiplier: number;
  username: string;
}

export interface Profile {
  username: string;
  lastSaved: string;
  gameState: GameState;
}