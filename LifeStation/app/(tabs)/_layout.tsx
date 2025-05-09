import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Fonts } from '../../constants/theme';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.tabBackground,
          borderTopColor: Colors.border,
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: Fonts.bold,
          fontWeight: '700',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: Colors.background,
          ...Platform.select({
            ios: {
              shadowColor: Colors.overlay,
              shadowOpacity: 0.8,
              shadowRadius: 10,
            },
            android: {
              elevation: 0,
            },
            web: {
              boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.8)',
            },
          }),
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontFamily: Fonts.bold,
          fontSize: 20,
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.8)',
          color: Colors.textPrimary,
        },
      }}>

<Tabs.Screen
        name="avatar-customization"
        options={{
          title: 'Avatar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
          headerTitle: 'Avatar',
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-square" size={size} color={color} />
          ),
          headerTitle: 'My Quests',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="id-card" size={size} color={color} />
          ),
          headerTitle: 'Player Profile',
        }}
      />

    
    </Tabs>
  );
}