import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, View } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Colors, Fonts } from '../../constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

function CustomHeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 30, height: 30, resizeMode: 'contain' }}
      />
      <Text
        style={{
          fontFamily: 'sans-serif',
          fontSize: 20,
          color: Colors.primary,
        }}
      >
        LifeStation
      </Text>
    </View>
  );
}

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
          fontFamily: 'sans-serif',
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
        headerTitle: () => <CustomHeaderTitle />,
      }}
    >
      <Tabs.Screen
        name="avatar-customization"
        options={{
          title: 'Avatar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-square" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="id-card" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
