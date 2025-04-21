jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => null,
    FontAwesome: () => null,
    MaterialIcons: () => null,
    // Add others if you use more icon sets
  };
});

// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTaskModal from '../../components/AddTaskModal'; // Correct relative path
import { Colors } from '@/constants/theme';

describe('AddTaskModal', () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();

  const setup = () => {
    return render(
      <AddTaskModal
        visible={true}
        onClose={mockOnClose}
        onAdd={mockOnAdd}
      />
    );
  };

  it('should render modal correctly', () => {
    const { getByText, getByTestId } = setup();

    expect(getByText('Add New Task')).toBeTruthy();
    expect(getByTestId('modal-title')).toBeTruthy();
  });

  it('should call onAdd when Add Task button is pressed', async () => {
    const { getByTestId, getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText('Enter task title'), 'New Task');
    fireEvent.press(getByTestId('submit-task'));

    await waitFor(() => expect(mockOnAdd).toHaveBeenCalledWith({
      title: 'New Task',
      deadline: undefined,
      type: 'todo',
    }));
  });

  it('should close modal when close button is pressed', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('close-modal'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should update task title when text is entered', () => {
    const { getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText('Enter task title'), 'Test Task');
    expect(getByPlaceholderText('Enter task title').props.value).toBe('Test Task');
  });

  it('should select correct task type', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId('type-progress'));
    const style = getByTestId('label-type-progress').props.style;
    const flattenedStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
    expect(flattenedStyle.color).toBe('black');

  });
});
