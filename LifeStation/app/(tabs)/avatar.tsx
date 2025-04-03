import { View, Text, StyleSheet } from 'react-native';
import AvatarSVG from "../../components/Avatar/avatar";

export default function AvatarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Avatar Screen</Text>
      <AvatarSVG/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#352722',
  },
  text: {
    color: '#FEDC32',
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 