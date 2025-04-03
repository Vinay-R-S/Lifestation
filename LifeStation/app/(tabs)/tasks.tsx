import { StyleSheet } from 'react-native';
import TaskManager from '../../components/TaskManager';

export default function TasksScreen() {
  
  return <TaskManager />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 