import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../../context/GameStateContext';
import GameStats from '../../components/GameStats';
import { Colors } from '../../constants/theme';

interface Task {
  id: string;
  title: string;
  deadline?: string;
  type: 'todo' | 'progress';
  completed?: boolean;
  progress?: number;
  progressHistory?: { date: string; value: number }[];
  startDate?: string;
  isHabit?: boolean;
}

export default function ProfileScreen() {
  const { state } = useGameState();

  const tasks: Task[] = []; // Replace with actual task fetching logic
  const habits = tasks.filter(task => task.isHabit);

  return (
    <View style={styles.container}>
      {/* Profile Info Header */}
      <View style={styles.profileHeader}>
        <Text style={styles.profileLabel}>Name:</Text>
        <Text style={styles.profileValue}>{state.profile?.name || 'N/A'}</Text>

        <Text style={styles.profileLabel}>Gender:</Text>
        <Text style={styles.profileValue}>{state.profile?.gender || 'N/A'}</Text>

        <Text style={styles.profileLabel}>Streak:</Text>
        <Text style={styles.profileValue}>{state.totalStreak || 0} days</Text>
      </View>

      {/* Game Stats */}
      <GameStats />

      {/* Habit Section */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={24} color={Colors.accent} />
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
                      Became a habit on{' '}
                      {habit.startDate
                        ? new Date(habit.startDate).toLocaleDateString()
                        : 'unknown date'}
                    </Text>
                    <Text style={styles.habitSubtext}>
                      Current streak: {state.habitStreaks[habit.id] || 0} days
                    </Text>
                  </View>
                  <View style={styles.habitBadge}>
                    <Ionicons name="star" size={16} color={Colors.accent} />
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
    backgroundColor: Colors.background,
  },
  profileHeader: {
    padding: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderColor: Colors.overlay,
    marginBottom: 10,
  },
  profileLabel: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: 'SpaceMono-Regular',
  },
  profileValue: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
    marginBottom: 10,
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
    color: Colors.accent,
    fontSize: 24,
    fontFamily: 'Orbitron-Bold',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
    textAlign: 'center',
  },
  emptySubtext: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  habitsList: {
    gap: 12,
  },
  habitItem: {
    backgroundColor: Colors.surface,
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
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: 'Orbitron-Bold',
  },
  habitSubtext: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'SpaceMono-Regular',
  },
  habitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.overlay,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  habitBadgeText: {
    color: Colors.accent,
    fontSize: 12,
    fontFamily: 'Orbitron-Bold',
  },
});
