// // ✅ Mock expo-font to avoid font loading issues in tests
// jest.mock('expo-font', () => ({
//   loadAsync: jest.fn(),
//   isLoaded: jest.fn(() => true),
// }));


// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import TaskManager from '../../components/TaskManager';
// import { GameStateProvider, useGameState } from '../../context/GameStateContext';  // Import the provider as it is

// // Mock the useGameState hook
// jest.mock('../../context/GameStateContext', () => ({
//   ...jest.requireActual('../../context/GameStateContext'),
//   useGameState: jest.fn(),
// }));

// const mockAddCoins = jest.fn();
// const mockDeductHealth = jest.fn();
// const mockUpdateLastProgress = jest.fn();
// const mockUpdateHabitStreak = jest.fn();

// describe('TaskManager', () => {
//   const setup = () => {

//     (useGameState as jest.Mock).mockReturnValue({
//       addCoins: mockAddCoins,
//       deductHealth: mockDeductHealth,
//       updateLastProgress: mockUpdateLastProgress,
//       updateHabitStreak: mockUpdateHabitStreak,
//     });

//     return render(
//       <GameStateProvider>
//         <TaskManager />
//       </GameStateProvider>
//     );
//   };

//   it('should render task list correctly', () => {
//     const { getByTestId } = setup();
//     expect(getByTestId('add-task-button')).toBeTruthy();
//   });

//   it('should show empty state when no tasks are added', () => {
//     const { getByTestId } = setup();
//     expect(getByTestId('empty-task-view')).toBeTruthy();
//   });

//   it('should open modal when + button is pressed', () => {
//     const { getByTestId } = setup();
//     fireEvent.press(getByTestId('add-task-button'));
//     expect(getByTestId('modal-title')).toBeTruthy();
//   });

//   it('should add task and close modal after adding task', async () => {
//     const { getByTestId, getByPlaceholderText } = setup();

//     fireEvent.press(getByTestId('add-task-button'));
//     fireEvent.changeText(getByPlaceholderText('Enter task title'), 'New Task');
//     fireEvent.press(getByTestId('submit-task'));

//     // await waitFor(() => expect(mockAddCoins).toHaveBeenCalled());
//     await waitFor(() => expect(getByTestId('add-task-button')).toBeTruthy());
//   });

//   it('should toggle task completion', async () => {
//     const { getByTestId } = setup();

//     fireEvent.press(getByTestId('add-task-button'));
//     fireEvent.changeText(getByTestId('input-title'), 'Test Task');
//     fireEvent.press(getByTestId('submit-task'));

//     // Wait for the task to appear
//     const taskId = 'task-1'; // This should be dynamically fetched or matched
//     await waitFor(() => expect(getByTestId(taskId)).toBeTruthy());


//     const taskCheckbox = getByTestId('checkbox-1'); // Adjust task ID
//     fireEvent.press(taskCheckbox);
//     expect(mockAddCoins).toHaveBeenCalled();
//   });

//   it('should increment and decrement progress', async () => {
//     const { getByTestId } = setup();

//     fireEvent.press(getByTestId('add-task-button'));
//     fireEvent.changeText(getByTestId('input-title'), 'Progress Task');
//     fireEvent.press(getByTestId('submit-task'));

//     // Wait for the task to appear
//     const taskId = 'task-1'; // This should be dynamically fetched or matched
//     await waitFor(() => expect(getByTestId(taskId)).toBeTruthy());

//     const incrementButton = getByTestId(`increment-${taskId}`);
//     const decrementButton = getByTestId(`decrement-${taskId}`);

//     fireEvent.press(incrementButton);
//     fireEvent.press(decrementButton);

//     expect(mockAddCoins).toHaveBeenCalled();
//   });
// });
