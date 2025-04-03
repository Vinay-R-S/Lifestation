import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../../context/GameStateContext';
import GameStats from '../../components/GameStats';

interface Task {
  id: string;
  title: string;
  deadline?: string;
  type: 'todo' | 'progress';
  completed?: boolean;
  progress?: number;
  progressHistory?: { date: string; value: number; }[];
  startDate?: string;
  isHabit?: boolean;
}

export default function ProfileScreen() {
  const { state } = useGameState();
  const tasks: Task[] = []; // You'll need to access your tasks here
  const habits = tasks.filter(task => task.isHabit);

  return (
    <View style={styles.container}>
      <GameStats />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color="#FEDC32" />
            <Text style={styles.sectionTitle}>Formed Habits</Text>
          </View>
          
          {habits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No habits formed yet</Text>
              <Text style={styles.emptySubtext}>
                Keep at your tasks for 21 days to form a habit!
              </Text>
            </View>
          ) : (
            <View style={styles.habitsList}>
              {habits.map(habit => (
                <View key={habit.id} style={styles.habitItem}>
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitTitle}>{habit.title}</Text>
                    <Text style={styles.habitSubtext}>
                      Became a habit on {habit.startDate ? new Date(habit.startDate).toLocaleDateString() : 'unknown date'}
                    </Text>
                    <Text style={styles.habitSubtext}>
                      Current streak: {state.habitStreaks[habit.id] || 0} days
                    </Text>
                  </View>
                  <View style={styles.habitBadge}>
                    <Ionicons name="star" size={16} color="#FEDC32" />
                    <Text style={styles.habitBadgeText}>Habit Formed!</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#352722',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    color: '#FEDC32',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#FEDC32',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#F7A721',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  habitsList: {
    gap: 12,
  },
  habitItem: {
    backgroundColor: '#9A1C22',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    color: '#FEDC32',
    fontSize: 18,
    fontWeight: 'bold',
  },
  habitSubtext: {
    color: '#F7A721',
    fontSize: 12,
    marginTop: 4,
  },
  habitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3263B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  habitBadgeText: {
    color: '#FEDC32',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 