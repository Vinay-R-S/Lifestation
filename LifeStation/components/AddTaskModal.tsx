import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts } from '@/constants/theme';

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
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.modalTitle} testID="modal-title">Add New Task</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose} >
                  <Ionicons name="close" size={24} color={Colors.yellow} />
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
                    placeholderTextColor={Colors.textMuted}
                    autoFocus
                    testID="input-title"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Deadline (Optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter deadline"
                    value={newTask.deadline}
                    onChangeText={(text) => setNewTask({ ...newTask, deadline: text })}
                    placeholderTextColor={Colors.textMuted}
                    testID="input-deadline"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Task Type</Text>
                    <View style={styles.typeSelector}>
                      <TouchableOpacity
                        style={[styles.typeButton, newTask.type === 'todo' && styles.selectedType]}
                        onPress={() => setNewTask({ ...newTask, type: 'todo' })}
                        testID="type-todo">
                        <Text style={[styles.typeText, newTask.type === 'todo' && styles.selectedText]} testID="label-type-todo">Todo Task</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.typeButton, newTask.type === 'progress' && styles.selectedType]}
                        onPress={() => setNewTask({ ...newTask, type: 'progress' })}
                        testID="type-progress">
                        <Text style={[styles.typeText, newTask.type === 'progress' && styles.selectedText]} testID="label-type-progress">Habit Task</Text>
                      </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddTask} testID="submit-task">
                  <Text style={styles.addButtonText} testID="submit-task-text">Add Task</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: Colors.overlay,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: Colors.yellow,
    fontSize: 22,
    fontFamily: Fonts.fancy,
  },
  closeButton: {
    padding: 8,
  },
  form: {
    gap: 18,
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    color: Colors.textMuted,
    fontSize: 15,
    fontFamily: Fonts.bold,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.background,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: Colors.background, // NEW: use a deep neutral from your theme
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border, // Optional: adds outline
  },
  selectedType: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.overlay,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  typeText: {
    fontSize: 15,
    color: Colors.textPrimary, // instead of Colors.textSecondary
    fontFamily: Fonts.bold,
  },
  selectedText: {
    color: 'black',
  },
  addButton: {
    backgroundColor: Colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
  },
  addButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontFamily: Fonts.fancy,
    fontWeight: 'bold',
  },
});
