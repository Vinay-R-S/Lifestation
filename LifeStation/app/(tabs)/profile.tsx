import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../../context/GameStateContext';
import GameStats from '../../components/GameStats';
import { Colors } from '../../constants/theme';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

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
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offlineMode, setOfflineMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is logged in
        const user = auth.currentUser;
        if (!user) {
          setError('No user is logged in');
          setLoading(false);
          return;
        }

        // Get user document reference
        const userDocRef = doc(db, 'users', user.uid);
        
        try {
          // Try to get document
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setOfflineMode(false); // Successfully got data
          } else {
            // Handle case where document doesn't exist
            setError('User profile not found');
          }
        } catch (docError: any) {
          console.log('Document fetch error:', docError);
          
          // Check if error is because client is offline
          if (docError.message?.includes('offline')) {
            setOfflineMode(true);
            setError('The client is currently offline. So unable to fetch data');
            
            // Try to use cached data if available (reading from cache works even offline)
            try {
              // Force offline mode and try again to get from cache
              await disableNetwork(db);
              const cachedDoc = await getDoc(userDocRef);
              if (cachedDoc.exists()) {
                setUserData(cachedDoc.data());
                setError('You are offline. Showing cached data.');
              } else {
                setError('No cached data available while offline');
              }
              // Re-enable network for future operations
              await enableNetwork(db);
            } catch (cacheError) {
              console.error('Cache fetch error:', cacheError);
              setError('Failed to load data while offline');
            }
          } else {
            setError(`Failed to load data: ${docError.message || 'Unknown error'}`);
          }
        }
      } catch (err: any) {
        console.error('General error:', err);
        setError(`Error: ${err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/login');
    } catch (err: any) {
      Alert.alert('Logout Failed', `Error: ${err.message || 'Unknown error'}`);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Force re-render which will trigger useEffect
  };

  const tasks: Task[] = []; // Keep your existing logic
  const habits = tasks.filter(task => task.isHabit);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading profile data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Offline Banner */}
      {offlineMode && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline" size={16} color="#FFF" />
          <Text style={styles.offlineBannerText}>The client is currently offline. So unable to fetch data.</Text>
        </View>
      )}
      
      {/* Error Message */}
      {error && !offlineMode && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={handleRetry} color={Colors.primary} />
        </View>
      )}

      {/* Main Content - Show even if there's an offline error */}
      {(userData || offlineMode) && (
        <>
          <View style={styles.profileHeader}>
            <Text style={styles.profileLabel}>Name:</Text>
            <Text style={styles.profileValue}>{userData?.name || 'Guest'}</Text>

            <Text style={styles.profileLabel}>Gender:</Text>
            <Text style={styles.profileValue}>{userData?.gender || 'Unspecified'}</Text>

            <Text style={styles.profileLabel}>Coins:</Text>
            <Text style={styles.profileValue}>{userData?.coins ?? 10}</Text>

            <Text style={styles.profileLabel}>Streak:</Text>
            <Text style={styles.profileValue}>{state.totalStreak || 0} days</Text>
          </View>

          <GameStats />

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
        </>
      )}

      {/* Completely failed to load anything */}
      {!userData && !offlineMode && error && (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={50} color={Colors.error || '#FF3B30'} />
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={handleRetry} color={Colors.primary} />
        </View>
      )}

      <View style={{ padding: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Keep your existing styles
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
  // New styles
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    backgroundColor: '#FFEEEE',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.error || '#FF3B30',
  },
  errorText: {
    color: Colors.error || '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'SpaceMono-Regular',
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'SpaceMono-Regular',
  },
  offlineBanner: {
    backgroundColor: '#F39C12',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  offlineBannerText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'SpaceMono-Regular',
  },
});
