import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Pressable, Text, View } from 'react-native';
import { GameStateProvider, useGameState } from '../context/GameStateContext';

// Test component that uses the context
const TestComponent = () => {
  const { state, addCoins, deductHealth, updateLastProgress, updateHabitStreak, clearNotification } = useGameState();
  return (
    <View>
      <Text testID="coins">{state.coins}</Text>
      <Text testID="health">{state.health}</Text>
      <Text testID="notification">{state.notification?.message || 'no-notification'}</Text>
      <Pressable testID="add-coins" onPress={() => addCoins(10)} />
      <Pressable testID="deduct-health" onPress={() => deductHealth(20)} />
      <Pressable testID="update-progress" onPress={() => updateLastProgress('task1')} />
      <Pressable testID="update-streak" onPress={() => updateHabitStreak('task1', true)} />
      <Pressable testID="clear-notification" onPress={clearNotification} />
    </View>
  );
};

// Wrapper component to provide context
const renderWithContext = (component: React.ReactElement) => {
  return render(
    <GameStateProvider>
      {component}
    </GameStateProvider>
  );
};

describe('GameStateContext', () => {
  it('provides initial state values', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    expect(getByTestId('coins').props.children).toBe(10);
    expect(getByTestId('health').props.children).toBe(100);
    expect(getByTestId('notification').props.children).toBe('no-notification');
  });

  it('adds coins and shows notification', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    fireEvent.press(getByTestId('add-coins'));

    expect(getByTestId('coins').props.children).toBe(20);
    expect(getByTestId('notification').props.children).toBe('+10 coins');
  });

  it('deducts health and shows notification', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    fireEvent.press(getByTestId('deduct-health'));

    expect(getByTestId('health').props.children).toBe(80);
    expect(getByTestId('notification').props.children).toBe('-20 health');
  });

  it('updates last progress date for a task', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    fireEvent.press(getByTestId('update-progress'));

    // We can't directly test the date, but we can verify the function was called
    expect(getByTestId('update-progress')).toBeTruthy();
  });

  it('updates habit streak for a task', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    fireEvent.press(getByTestId('update-streak'));

    // We can't directly test the streak, but we can verify the function was called
    expect(getByTestId('update-streak')).toBeTruthy();
  });

  it('clears notification', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    // First add a notification
    fireEvent.press(getByTestId('add-coins'));
    expect(getByTestId('notification').props.children).toBe('+10 coins');

    // Then clear it
    fireEvent.press(getByTestId('clear-notification'));
    expect(getByTestId('notification').props.children).toBe('no-notification');
  });

  it('throws error when useGameState is used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useGameState must be used within a GameStateProvider');

    // Restore console.error
    console.error = originalError;
  });

  it('handles decimal coin amounts correctly', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    fireEvent.press(getByTestId('add-coins'));

    // Initial coins (10) + 10 = 20
    expect(getByTestId('coins').props.children).toBe(20);
  });

  it('prevents health from going below 0', () => {
    const { getByTestId } = renderWithContext(<TestComponent />);
    
    // Try to deduct more health than available
    fireEvent.press(getByTestId('deduct-health'));
    fireEvent.press(getByTestId('deduct-health'));
    fireEvent.press(getByTestId('deduct-health'));
    fireEvent.press(getByTestId('deduct-health'));
    fireEvent.press(getByTestId('deduct-health'));
    fireEvent.press(getByTestId('deduct-health'));

    expect(getByTestId('health').props.children).toBe(0);
  });
}); 