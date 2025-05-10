import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskManager from '../../components/TaskManager';
import TitleWithBox from '../../components/TitleWithBox'; // Import the TitleWithBox component
import { Colors } from '../../constants/theme'; // Import theme if needed

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      {/* Reuse the TitleWithBox component */}
      <TitleWithBox 
        title="Tasks" 
        backgroundColor={Colors.primary} 
        fontSize={24} 
        textColor={Colors.textPrimary} 
      />
      <TaskManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'flex-start', // Aligns children at the top
  },
});
