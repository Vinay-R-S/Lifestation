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

  profile: {
    name: string;
    avatar: string;
    gender?: string;
  };
  totalStreak: number;
}

interface GameStateContextType {
  state: GameState;
  addCoins: (amount: number) => void;
  deductHealth: (amount: number) => void;
  updateLastProgress: (taskId: string) => void;
  updateHabitStreak: (taskId: string, increment: boolean) => void;
  clearNotification: () => void;
}

// No need to define 'value' prop here
interface GameStateProviderProps {
  children: React.ReactNode;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: GameStateProviderProps) {
  const [state, setState] = useState<GameState>({
    coins: 10,
    health: 100,
    lastProgressDates: {},
    habitStreaks: {},
    notification: null,

    profile: {
      name: 'Guest',
      avatar: 'default_avatar.png',
      gender: 'unspecified',
    },
    totalStreak: 0,
  });

  const addCoins = (amount: number) => {
    const roundedAmount = Math.round(amount * 10) / 10;
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
    setState(prev => {
      const newHealth = Math.max(0, prev.health - amount);
      return {
        ...prev,
        health: newHealth,
        // If health reaches 0, set coins to 0
        coins: newHealth === 0 ? 0 : prev.coins,
        notification: {
          message: newHealth === 0 
            ? 'Game Over! Lost all coins!' 
            : `-${amount} health`,
          type: 'health'
        }
      };
    });
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
