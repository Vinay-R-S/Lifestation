import { View, Text, StyleSheet } from 'react-native';
import AvatarSVG from '../../components/Avatar/avatar';
import { Colors, TextStyles } from '../../constants/theme';

export default function AvatarScreen() {
  return (
    <View style={styles.container}>
      <Text style={TextStyles.title}>Avatar Screen</Text>
      <AvatarSVG />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
