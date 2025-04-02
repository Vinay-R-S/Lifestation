import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';

interface ProgressUpdate {
  date: string;
  value: number;
}

interface Task {
  id: string;
  title: string;
  deadline?: string;
  type: 'todo' | 'progress';
  completed?: boolean;
  progress?: number;
  progressHistory?: ProgressUpdate[];
  startDate?: string;
  isHabit?: boolean;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed' | 'progress' | 'progressHistory' | 'startDate' | 'isHabit'>) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
      progress: newTask.type === 'progress' ? 0 : undefined,
      progressHistory: newTask.type === 'progress' ? [] : undefined,
      startDate: newTask.type === 'progress' ? new Date().toISOString() : undefined,
      isHabit: false,
    };
    setTasks([...tasks, task]);
    setModalVisible(false);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const checkForHabit = (task: Task) => {
    if (!task.progressHistory || task.isHabit) return false;
    
    // Sort progress updates by date
    const sortedUpdates = [...task.progressHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (sortedUpdates.length < 21) return false;

    // Check the last 21 updates
    const last21Updates = sortedUpdates.slice(0, 21);
    const today = new Date();
    const twentyOneDaysAgo = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000);

    // Check if we have 21 consecutive days of progress
    for (let i = 0; i < 21; i++) {
      const updateDate = new Date(last21Updates[i].date);
      const expectedDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      
      // Check if we have an update for each of the last 21 days
      if (updateDate.toDateString() !== expectedDate.toDateString()) {
        return false;
      }
      
      // Check if the progress value was incremented
      if (i > 0 && last21Updates[i].value >= last21Updates[i-1].value) {
        return false;
      }
    }
    
    return true;
  };

  const updateProgress = (taskId: string, increment: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.type === 'progress') {
        const newProgress = (task.progress || 0) + (increment ? 1 : -1);
        const updatedProgress = Math.max(0, newProgress);
        
        // Add progress update to history
        const newHistory = [...(task.progressHistory || []), {
          date: new Date().toISOString(),
          value: updatedProgress
        }];

        const isNowHabit = checkForHabit({
          ...task,
          progress: updatedProgress,
          progressHistory: newHistory
        });

        return {
          ...task,
          progress: updatedProgress,
          progressHistory: newHistory,
          isHabit: isNowHabit || task.isHabit
        };
      }
      return task;
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#F7A721" />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add a new task</Text>
          </View>
        ) : (
          tasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <View style={styles.taskInfo}>
                <View style={styles.titleContainer}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {task.isHabit && (
                    <View style={styles.habitBadge}>
                      <Ionicons name="star" size={16} color="#FEDC32" />
                      <Text style={styles.habitText}>Habit</Text>
                    </View>
                  )}
                </View>
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
          ))
        )}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskTitle: {
    color: '#FEDC32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3263B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  habitText: {
    color: '#FEDC32',
    fontSize: 12,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: '#FEDC32',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#F7A721',
    fontSize: 14,
    marginTop: 8,
  },
}); 