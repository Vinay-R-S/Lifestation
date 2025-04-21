import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskManager from '../../components/TaskManager';
import { GameStateProvider } from '../../context/GameStateContext';  // Import the provider as it is

const mockAddCoins = jest.fn();
const mockDeductHealth = jest.fn();
const mockUpdateLastProgress = jest.fn();
const mockUpdateHabitStreak = jest.fn();

describe('TaskManager', () => {
  // Removed the `value` prop here, as the `GameStateProvider` itself
  // already manages the context state internally.
  const setup = () => {
    return render(
      <GameStateProvider>
        <TaskManager />
      </GameStateProvider>
    );
  };

  it('should render task list correctly', () => {
    const { getByTestId } = setup();
    expect(getByTestId('add-task-button')).toBeTruthy();
  });

  it('should show empty state when no tasks are added', () => {
    const { getByTestId } = setup();
    expect(getByTestId('empty-task-view')).toBeTruthy();
  });

  it('should open modal when + button is pressed', () => {
    const { getByTestId } = setup();
    fireEvent.press(getByTestId('add-task-button'));
    expect(getByTestId('modal-title')).toBeTruthy();
  });

  it('should add task and close modal after adding task', async () => {
    const { getByTestId, getByPlaceholderText } = setup();
    
    fireEvent.press(getByTestId('add-task-button'));
    fireEvent.changeText(getByPlaceholderText('Enter task title'), 'New Task');
    fireEvent.press(getByTestId('submit-task'));

    await waitFor(() => expect(mockAddCoins).toHaveBeenCalled());
  });

  it('should toggle task completion', async () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('add-task-button'));
    fireEvent.changeText(getByTestId('input-title'), 'Test Task');
    fireEvent.press(getByTestId('submit-task'));

    const taskCheckbox = getByTestId('checkbox-1'); // Adjust task ID accordingly
    fireEvent.press(taskCheckbox);
    expect(mockAddCoins).toHaveBeenCalled();
  });

  it('should increment and decrement progress', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('add-task-button'));
    fireEvent.changeText(getByTestId('input-title'), 'Progress Task');
    fireEvent.press(getByTestId('submit-task'));

    fireEvent.press(getByTestId('increment-1')); // Adjust task ID accordingly
    fireEvent.press(getByTestId('decrement-1'));
    
    expect(mockAddCoins).toHaveBeenCalled();
  });
});
