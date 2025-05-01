import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const AddTaskModal = ({ visible, onClose, onAdd }: any) => {
  if (!visible) return null;
  
  return (
    <View testID="add-task-modal">
      <TextInput 
        testID="input-title" 
        value=""
        onChangeText={() => {}}
      />
      <TextInput 
        testID="input-deadline" 
        value=""
        onChangeText={() => {}}
      />
      
      <TouchableOpacity 
        testID="type-todo"
        onPress={() => onAdd({ type: 'todo', title: 'Test', deadline: '' })}
      >
        <Text>Todo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        testID="type-progress"
        onPress={() => onAdd({ type: 'progress', title: 'Test', deadline: '' })}
      >
        <Text>Progress</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        testID="submit-task"
        onPress={() => onAdd({ type: 'todo', title: 'Test', deadline: '' })}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskModal;