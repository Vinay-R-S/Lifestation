import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Animated } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';

import { useGameState } from '../context/GameStateContext';
import { Colors, TextStyles } from '../constants/theme';

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

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const taskAnimations = useRef<{ [key: string]: Animated.Value }>({});
  const { addCoins, deductHealth, updateLastProgress, updateHabitStreak } = useGameState();

  useEffect(() => {
    const checkMissedTasks = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.deadline && new Date(task.deadline) < now && !task.completed) {
          deductHealth(10);
        }

        if (task.type === 'progress' && task.progressHistory) {
          const lastProgress = task.progressHistory[task.progressHistory.length - 1];
          if (lastProgress) {
            const daysSinceLastProgress = Math.floor(
              (now.getTime() - new Date(lastProgress.date).getTime()) / (1000 * 60 * 60 * 24)
            );
            if (daysSinceLastProgress >= 3) {
              deductHealth(15);
            }
          }
        }
      });
    };

    const interval = setInterval(checkMissedTasks, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [tasks, deductHealth]);

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
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
  
    if (!task.completed) {
      if (!taskAnimations.current[taskId]) {
        taskAnimations.current[taskId] = new Animated.Value(0);
      }
  
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
      const coinReward = task.isHabit ? 1 : 0.5;
      addCoins(coinReward);
      if (task.isHabit) updateHabitStreak(taskId, true);
  
      Animated.timing(taskAnimations.current[taskId], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        delete taskAnimations.current[taskId];
      });
    } else {
      setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    }
  };  

  const checkForHabit = (task: Task) => {
    if (!task.progressHistory || task.isHabit) return false;

    const today = new Date();
    const startDate = new Date(task.startDate!);
    const daysDifference = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDifference >= 21) {
      const last21Days = new Set();
      task.progressHistory.forEach(update => {
        const updateDate = new Date(update.date);
        if (updateDate >= new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000)) {
          last21Days.add(updateDate.toDateString());
        }
      });
      return last21Days.size >= 21;
    }
    return false;
  };

  const updateProgress = (taskId: string, increment: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.type === 'progress') {
        const updatedProgress = Math.max(0, (task.progress || 0) + (increment ? 1 : -1));
        const newHistory = [...(task.progressHistory || []), {
          date: new Date().toISOString(),
          value: updatedProgress
        }];

        const isNowHabit = checkForHabit({
          ...task,
          progress: updatedProgress,
          progressHistory: newHistory
        });

        if (increment) {
          const coinReward = task.isHabit ? 0.4 : 0.2;
          addCoins(coinReward);
        } else {
          deductHealth(10);
          addCoins(-0.1);
        }

        updateLastProgress(taskId);

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
          <View style={styles.emptyContainer} testID="empty-task-view">
            <Ionicons name="document-text-outline" size={64} color={Colors.accent} />
            <Text style={[styles.emptyText, TextStyles.body]} testID="empty-task-title">No tasks yet</Text>
            <Text style={[styles.emptySubtext, TextStyles.body]} testID="empty-task-subtext">Tap the + button to add a new task</Text>
          </View>
        ) : (
          tasks.map(task => {
            const slide = taskAnimations.current[task.id]?.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -500],
            });

            const fade = taskAnimations.current[task.id]?.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            });

            return (
              <Animated.View 
                key={task.id}
                testID={`task-${task.id}`}
                style={[
                  styles.taskItem,
                  { transform: [{ translateX: slide || 0 }], opacity: fade || 1 }
                ]}
              >
                <View style={styles.taskInfo}>
                  <View style={styles.titleContainer}>
                    <Text style={[styles.taskTitle, TextStyles.title]} testID={`task-title-${task.id}`}>{task.title}</Text>
                    {task.isHabit && (
                      <View style={styles.habitBadge} testID={`habit-badge-${task.id}`}>
                        <Ionicons name="star" size={16} color={Colors.yellow} />
                        <Text style={[styles.habitText, TextStyles.body]}>Habit</Text>
                      </View>
                    )}
                  </View>
                  {task.deadline && (
                    <Text style={[styles.deadline, TextStyles.body]} testID={`deadline-${task.id}`}>Due: {task.deadline}</Text>
                  )}
                </View>
                {task.type === 'todo' ? (
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleTaskCompletion(task.id)}
                    testID={`checkbox-${task.id}`}
                  >
                    {task.completed && <Ionicons name="checkmark" size={24} color={Colors.textPrimary} />}
                  </TouchableOpacity>
                ) : (
                  <View style={styles.progressControls}>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={() => updateProgress(task.id, false)}
                      testID={`decrement-${task.id}`} // Fixed testID pattern
                    >
                      <Text style={styles.progressButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={[styles.progressText, TextStyles.body]} testID={`progress-count-${task.id}`}>{task.progress || 0}</Text>
                    <TouchableOpacity
                      style={styles.progressButton}
                      onPress={() => updateProgress(task.id, true)}
                      testID={`increment-${task.id}`}
                    >
                      <Text style={styles.progressButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Animated.View>
            );
          })
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
        testID="add-task-button"
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddTask}
        testID="add-task-modal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: Colors.textSecondary,
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
    color: Colors.yellow,
  },
  habitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  habitText: {
    color: Colors.yellow,
  },
  deadline: {
    color: Colors.accent,
    marginTop: 4,
  },
  checkbox: {
    padding: 10,
  },
  progressControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 5,
  },
  progressButtonText: {
    color: Colors.background,
    fontSize: 18,
  },
  progressText: {
    minWidth: 30,
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    marginTop: 20,
    color: Colors.textPrimary,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default TaskManager;