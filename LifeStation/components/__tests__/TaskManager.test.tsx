import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import TaskManager from '../TaskManager';

// Mock theme constants
jest.mock('../../constants/theme', () => ({
  Colors: {
    background: '#0A0D1A',
    surface: '#11182A',
    overlay: '#1A2238',
    border: '#23314D',
    primary: '#4F80FF',
    secondary: '#6A92D3',
    accent: '#80A9FF',
    textPrimary: '#A2B9FF',
    textSecondary: '#B3C9FF',
    textMuted: '#7F95B1',
    yellow: '#4F80FF',
    success: '#2F6BCF',
    warning: '#4477DD',
    error: '#5566CC',
    tabActive: '#4F80FF',
    tabInactive: '#1A2238',
    tabBackground: '#0A0D1A',
    buttonHover: '#6A92D3',
    tabHover: '#334D77',
  },
  TextStyles: {
    title: {
      fontFamily: 'Orbitron-Bold',
      fontSize: 24,
      color: 'black',
    },
    body: {
      fontFamily: 'SpaceMono-Regular',
      fontSize: 16,
      color: '#A2B9FF',
    },
  },
}));

// 1. Mock all external dependencies properly
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color }: { name: string; size: number; color: string }) => (
    <div data-testid={`icon-${name}`} style={{ fontSize: size, color }}>{name}</div>
  ),
}));

jest.mock('../../context/GameStateContext', () => ({
  useGameState: () => ({
    addCoins: jest.fn(),
    deductHealth: jest.fn(),
    updateLastProgress: jest.fn(),
    updateHabitStreak: jest.fn(),
  }),
}));

// 2. Mock AddTaskModal with all required props
jest.mock('../AddTaskModal', () => {
  const { View, Text, TouchableOpacity, TextInput } = require('react-native');
  return function MockAddTaskModal({ visible, onClose, onAdd }: any) {
    if (!visible) return null;
    return (
      <View testID="add-task-modal">
        <TextInput testID="input-title" />
        <TextInput testID="input-deadline" />
        <TouchableOpacity 
          testID="type-progress" 
          onPress={() => onAdd({ type: 'progress', title: 'Test Task' })}
        >
          <Text>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          testID="submit-task"
          onPress={() => onAdd({ type: 'progress', title: 'Test Task' })}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          testID="close-modal"
          onPress={onClose}
        >
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

// 3. Mock Animated properly
jest.mock('react-native/Libraries/Animated/Animated', () => {
  const actual = jest.requireActual('react-native/Libraries/Animated/Animated');
  return {
    ...actual,
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      interpolate: jest.fn(() => 0),
    })),
    timing: jest.fn(() => ({
      start: jest.fn((callback) => callback && callback()),
    })),
  };
});

describe('TaskManager', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(Date, 'now').mockReturnValue(123456789);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should handle progress tasks', async () => {
    const { getByTestId } = render(<TaskManager />);

    // Open modal and add progress task
    act(() => {
      fireEvent.press(getByTestId('add-task-button'));
      fireEvent.press(getByTestId('type-progress'));
      fireEvent.press(getByTestId('submit-task'));
    });

    // Verify task was added with progress controls
    await waitFor(() => {
      const taskId = '123456789'; // Matches our mocked Date.now()
      expect(getByTestId(`task-${taskId}`)).toBeTruthy();
      expect(getByTestId(`task-title-${taskId}`)).toHaveTextContent('Test Task');
      expect(getByTestId(`increment-${taskId}`)).toBeTruthy();
      expect(getByTestId(`decrement-${taskId}`)).toBeTruthy();
      expect(getByTestId(`progress-count-${taskId}`)).toHaveTextContent('0');
    });
  });
});