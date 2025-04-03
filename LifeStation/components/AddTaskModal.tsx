import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Task {
  id: string;
  title: string;
  deadline?: string;
  type: 'todo' | 'progress';
  completed?: boolean;
  progress?: number;
}

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id' | 'completed' | 'progress'>) => void;
}

export default function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [newTask, setNewTask] = React.useState({
    title: '',
    deadline: '',
    type: 'todo' as 'todo' | 'progress',
  });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      onAdd({
        title: newTask.title,
        deadline: newTask.deadline || undefined,
        type: newTask.type,
      });
      setNewTask({ title: '', deadline: '', type: 'todo' });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Add New Task</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Ionicons name="close" size={24} color="#FEDC32" />
                </TouchableOpacity>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Task Title</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChangeText={(text) => setNewTask({ ...newTask, title: text })}
                    placeholderTextColor="#999999"
                    autoFocus={true}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Deadline (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter deadline"
                    value={newTask.deadline}
                    onChangeText={(text) => setNewTask({ ...newTask, deadline: text })}
                    placeholderTextColor="#999999"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Task Type</Text>
                  <View style={styles.typeSelector}>
                    <TouchableOpacity
                      style={[
                        styles.typeButton,
                        newTask.type === 'todo' && styles.selectedType,
                      ]}
                      onPress={() => setNewTask({ ...newTask, type: 'todo' })}
                    >
                      <Text style={styles.typeText}>Todo Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.typeButton,
                        newTask.type === 'progress' && styles.selectedType,
                      ]}
                      onPress={() => setNewTask({ ...newTask, type: 'progress' })}
                    >
                      <Text style={styles.typeText}>Habit Task</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                  <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#352722',
    margin: 20,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FEDC32',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    color: '#FEDC32',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    color: '#000000',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#F7A721',
    height: 48,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#9A1C22',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#E3263B',
  },
  typeText: {
    color: '#FEDC32',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#F7A721',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#352722',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 