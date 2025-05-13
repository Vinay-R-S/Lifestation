import { Colors } from '../constants/theme'; // Adjust if using aliases
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors['light'] // assuming both light/dark share keys
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  return colorFromProps ?? Colors[theme][colorName]; // ✅ this fixes the issue
}
