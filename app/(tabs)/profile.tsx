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
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import TitleWithBox from '../../components/TitleWithBox'; 


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
    {/* NFT Marketplace - TOPMOST RIGHT */}
    <View style={styles.nftButtonContainer}>
      <TouchableOpacity
        style={styles.nftButton}
        onPress={() => WebBrowser.openBrowserAsync('https://rplg.co/facd2061')}
      >
        <Ionicons name="cart" size={20} color={Colors.primary} />
        <Text style={styles.nftButtonText}>NFT Marketplace</Text>
      </TouchableOpacity>
    </View>

    {/* Title */}
    <TitleWithBox 
      title="Profile" 
      backgroundColor={Colors.primary} 
      fontSize={24} 
      textColor={Colors.textPrimary} 
    />
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
            <Text style={[styles.profileValue, styles.bitcoinValue]}>
              <Ionicons name="logo-bitcoin" size={18} color="yellow" /> 
              {userData?.coins ?? 0}
            </Text>

            <Text style={styles.profileLabel}>Streak:</Text>
            <Text style={styles.profileValue}>{state.totalStreak || 0} days</Text>
          </View>

          <GameStats />

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star" size={24} color="yellow" />
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
                        <Ionicons name="star" size={16} color="yellow" />
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
    fontFamily: 'sans-serif',
  },
  profileValue: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: 'sans-serif',
    marginBottom: 10,
  },
  bitcoinValue: {
    color: 'yellow', // Bitcoin value color
    fontSize: 18,
    fontFamily: 'sans-serif',
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
    color: Colors.primary,
    fontSize: 24,
    fontFamily: 'sans-serif',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 18,
    fontFamily: 'sans-serif',
  },
  emptySubtext: {
    color: Colors.textMuted,
    fontSize: 14,
    fontFamily: 'sans-serif',
    marginTop: 10,
  },
  habitItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.overlay,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitInfo: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 16,
    fontFamily: 'sans-serif',
    color: Colors.textPrimary,
  },
  habitSubtext: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: Colors.textMuted,
  },
  habitBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'yellow',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitBadgeText: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    color: Colors.accent,
    marginLeft: 5,
  },
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
    fontFamily: 'sans-serif',
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'sans-serif',
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
    fontFamily: 'sans-serif',
  },
  nftButtonContainer: {
    position: 'absolute',
    top: 10,  
    right: 10,
    zIndex: 999,
    marginTop: 100
  },
  nftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  
  nftButtonText: {
    marginLeft: 6,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  habitsList: {
    flex: 1,
  }
});
