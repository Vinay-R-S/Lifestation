import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGameState } from '../context/GameStateContext';
import { Colors } from '../constants/theme'; // Assuming your theme file path

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
    outputRange: ['#FF4E4E', '#FF9F45', '#FFD166', Colors.accent], // transitioning to your accent color
  });

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <View style={styles.healthContainer}>
          <View style={styles.healthHeader}>
            <Ionicons name="heart" size={24} color="red" />
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

      <Animated.View style={[styles.coinContainer, { transform: [{ scale: coinAnimation }] }]}>
        <Ionicons name="logo-bitcoin" size={24} color="yellow" />
        <Text style={styles.coinText}>{state.coins}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
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
  healthText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: 'Orbitron-Bold',
  },
  healthBarContainer: {
    height: 12,
    backgroundColor: Colors.surface,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.overlay,
  },
  healthBar: {
    height: '100%',
    borderRadius: 6,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.overlay,
  },
  coinText: {
    color: "yellow",
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
});
