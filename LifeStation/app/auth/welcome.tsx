import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Fonts } from '../../constants/theme'; // adjust path if needed

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      {/* Title */}
      <Animated.Text entering={FadeInDown.delay(100)} style={styles.title}>
        LifeStation
      </Animated.Text>

      {/* Buttons side-by-side */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.halfButton]} onPress={() => router.push('/auth/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.halfButton]} onPress={() => router.push('/auth/signup')}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 42,
    color: Colors.accent,
    fontFamily: Fonts.bold,
    marginBottom: 40,
    letterSpacing: 1.5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  halfButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: Fonts.regular,
    letterSpacing: 1.1,
  },
});
