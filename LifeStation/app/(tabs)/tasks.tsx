import { View, StyleSheet } from 'react-native';
import TaskManager from '../../components/TaskManager';
import { Colors } from '../../constants/theme';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <TaskManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
