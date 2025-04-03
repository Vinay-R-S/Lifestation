import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../context/GameStateContext';

export default function GameStats() {
  const { state } = useGameState();
  const [coinAnimation] = useState(new Animated.Value(1));
  const [healthAnimation] = useState(new Animated.Value(state.health));
  const [coinChange, setCoinChange] = useState<number | null>(null);
  const [healthChange, setHealthChange] = useState<number | null>(null);

  useEffect(() => {
    if (coinChange !== null) {
      Animated.sequence([
        Animated.timing(coinAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(coinAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setCoinChange(null), 1000);
      });
    }
  }, [coinChange]);

  useEffect(() => {
    if (healthChange !== null) {
      Animated.sequence([
        Animated.timing(healthAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(healthAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setHealthChange(null), 1000);
      });
    }
  }, [healthChange]);

  useEffect(() => {
    Animated.spring(healthAnimation, {
      toValue: state.health,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  }, [state.health]);

  const healthBarWidth = healthAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const healthBarColor = healthAnimation.interpolate({
    inputRange: [0, 30, 60, 100],
    outputRange: ['#FF0000', '#FF6B00', '#FFA500', '#4CAF50'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <View style={styles.healthContainer}>
          <View style={styles.healthHeader}>
            <Ionicons name="heart" size={24} color="#E3263B" />
            <Text style={styles.healthText}>{Math.round(state.health)}%</Text>
          </View>
          <View style={styles.healthBarContainer}>
            <Animated.View
              style={[
                styles.healthBar,
                {
                  width: healthBarWidth,
                  backgroundColor: healthBarColor,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.coinContainer}>
        <Ionicons name="logo-bitcoin" size={24} color="#F7A721" />
        <Text style={styles.coinText}>{state.coins}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#352722',
  },
  statContainer: {
    flex: 1,
    marginRight: 16,
  },
  healthContainer: {
    width: '100%',
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  healthBarContainer: {
    height: 12,
    backgroundColor: '#1A1A1A',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  healthBar: {
    height: '100%',
    borderRadius: 6,
  },
  healthText: {
    color: '#FEDC32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  coinText: {
    color: '#FEDC32',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 