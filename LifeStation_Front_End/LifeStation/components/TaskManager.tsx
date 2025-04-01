import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';

interface Task {
  id: string;
  title: string;
  deadline?: string;
  type: 'todo' | 'progress';
  completed?: boolean;
  progress?: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'progress'>) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      progress: newTask.type === 'progress' ? 0 : undefined,
    };
    setTasks([...tasks, task]);
    setModalVisible(false);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateProgress = (taskId: string, increment: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.type === 'progress') {
        const newProgress = (task.progress || 0) + (increment ? 1 : -1);
        return { ...task, progress: Math.max(0, newProgress) };
      }
      return task;
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              {task.deadline && (
                <Text style={styles.deadline}>Due: {task.deadline}</Text>
              )}
            </View>
            {task.type === 'todo' ? (
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTaskCompletion(task.id)}
              >
                {task.completed && <Ionicons name="checkmark" size={24} color="#E3263B" />}
              </TouchableOpacity>
            ) : (
              <View style={styles.progressControls}>
                <TouchableOpacity
                  style={styles.progressButton}
                  onPress={() => updateProgress(task.id, false)}
                >
                  <Text style={styles.progressButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.progressText}>{task.progress || 0}</Text>
                <TouchableOpacity
                  style={styles.progressButton}
                  onPress={() => updateProgress(task.id, true)}
                >
                  <Text style={styles.progressButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#352722',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#9A1C22',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: '#FEDC32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deadline: {
    color: '#F7A721',
    fontSize: 12,
    marginTop: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FEDC32',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressButton: {
    backgroundColor: '#E3263B',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  progressButtonText: {
    color: '#FEDC32',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#FEDC32',
    fontSize: 16,
    marginHorizontal: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F7A721',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
}); 