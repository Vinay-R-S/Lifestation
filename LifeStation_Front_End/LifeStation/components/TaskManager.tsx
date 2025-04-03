import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';
import { useGameState } from '../context/GameStateContext';

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
  const taskAnimations = useRef<{ [key: string]: Animated.Value }>({});
  const { addCoins, deductHealth, updateLastProgress, updateHabitStreak, state } = useGameState();

  // Check for missed deadlines and progress
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

    const interval = setInterval(checkMissedTasks, 1000 * 60 * 60); // Check every hour
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
      // Initialize animation value if it doesn't exist
      if (!taskAnimations.current[taskId]) {
        taskAnimations.current[taskId] = new Animated.Value(0);
      }

      // First mark the task as completed
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      // Add coins based on whether it's a habit
      const coinReward = task.isHabit ? 1 : 0.5;
      addCoins(coinReward);

      // Update habit streak
      if (task.isHabit) {
        updateHabitStreak(taskId, true);
      }

      // Then start the slide-out animation
      Animated.parallel([
        Animated.timing(taskAnimations.current[taskId], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Remove the task after animation completes
        setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
        delete taskAnimations.current[taskId];
      });
    } else {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    }
  };

  const checkForHabit = (task: Task) => {
    if (!task.progressHistory || task.isHabit) return false;
    
    const today = new Date();
    const startDate = new Date(task.startDate!);
    const daysDifference = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Check if task has been done for 21 consecutive days
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

        // Handle rewards/penalties
        if (increment) {
          const coinReward = task.isHabit ? 0.4 : 0.2;
          addCoins(coinReward);
        } else {
          deductHealth(10);
          addCoins(-0.1);
        }

        // Update last progress date
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
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#F7A721" />
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add a new task</Text>
          </View>
        ) : (
          tasks.map(task => {
            const slideAnimation = taskAnimations.current[task.id]?.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -500],
            });

            const fadeAnimation = taskAnimations.current[task.id]?.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            });

            return (
              <Animated.View 
                key={task.id} 
                style={[
                  styles.taskItem,
                  {
                    transform: [{ translateX: slideAnimation || 0 }],
                    opacity: fadeAnimation || 1,
                  }
                ]}
              >
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
              </Animated.View>
            );
          })
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