import React from 'react';
import { View } from 'react-native';
import { useGameState } from '../context/GameStateContext';
import NotificationPopup from './NotificationPopup';

export default function NotificationManager() {
  const { state, clearNotification } = useGameState();

  if (!state.notification) return null;

  return (
    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <NotificationPopup
        message={state.notification.message}
        type={state.notification.type}
        onHide={clearNotification}
      />
    </View>
  );
} 