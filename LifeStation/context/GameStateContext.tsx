import React, { createContext, useContext, useState } from 'react';

interface GameState {
  coins: number;
  health: number;
  lastProgressDates: { [taskId: string]: string };
  habitStreaks: { [taskId: string]: number };
  notification: {
    message: string;
    type: 'coin' | 'health';
  } | null;
}

interface GameStateContextType {
  state: GameState;
  addCoins: (amount: number) => void;
  deductHealth: (amount: number) => void;
  updateLastProgress: (taskId: string) => void;
  updateHabitStreak: (taskId: string, increment: boolean) => void;
  clearNotification: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>({
    coins: 10,
    health: 100,
    lastProgressDates: {},
    habitStreaks: {},
    notification: null,
  });

  const addCoins = (amount: number) => {
    const roundedAmount = Math.round(amount * 10) / 10; // Round to 1 decimal place
    setState(prev => ({
      ...prev,
      coins: Math.round((prev.coins + roundedAmount) * 10) / 10,
      notification: {
        message: `${roundedAmount > 0 ? '+' : ''}${roundedAmount} coins`,
        type: 'coin'
      }
    }));
  };

  const deductHealth = (amount: number) => {
    setState(prev => ({
      ...prev,
      health: Math.max(0, prev.health - amount),
      notification: {
        message: `-${amount} health`,
        type: 'health'
      }
    }));
  };

  const updateLastProgress = (taskId: string) => {
    setState(prev => ({
      ...prev,
      lastProgressDates: {
        ...prev.lastProgressDates,
        [taskId]: new Date().toISOString(),
      },
    }));
  };

  const updateHabitStreak = (taskId: string, increment: boolean) => {
    setState(prev => ({
      ...prev,
      habitStreaks: {
        ...prev.habitStreaks,
        [taskId]: increment
          ? (prev.habitStreaks[taskId] || 0) + 1
          : 0,
      },
    }));
  };

  const clearNotification = () => {
    setState(prev => ({
      ...prev,
      notification: null,
    }));
  };

  return (
    <GameStateContext.Provider
      value={{
        state,
        addCoins,
        deductHealth,
        updateLastProgress,
        updateHabitStreak,
        clearNotification,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
} 