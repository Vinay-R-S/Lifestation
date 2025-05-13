import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../constants/theme'; // Import your theme

interface TitleWithBoxProps {
  title: string;
  backgroundColor?: string;
  fontSize?: number;
  textColor?: string;
}

const TitleWithBox = ({ title, backgroundColor = Colors.primary, fontSize = 24, textColor = Colors.textPrimary }: TitleWithBoxProps) => {
  return (
    <View style={[styles.titleContainer, { backgroundColor }]}>
      <Text style={[styles.title, { fontSize, color: textColor }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%', // Full width
    paddingVertical: 10, // Vertical padding
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  title: {
    fontWeight: 'bold', // Bold font
    fontFamily: Fonts.bold, // Use bold font family
    textAlign: 'center', // Center the text
  },
});

export default TitleWithBox;
