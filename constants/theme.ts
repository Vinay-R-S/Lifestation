export const Colors = {
  // Background & Surface (Space + Pixel Shadow Vibes)
  background: '#0D0A1A',      // Deep space purple
  surface: '#161123',         // Card or elevated UI background
  overlay: '#2C2040',         // Overlay surfaces
  border: '#3D2B57',          // Soft violet-gray border

  // Accent & Primary Colors (From logo)
  primary: '#FF72B0',         // Vibrant pixel pink (suit)
  secondary: '#FDC863',       // Glowing pixel yellow/orange (head)
  accent: '#6DFDC3',          // Mint green orbit ring

  // Text Colors
  textPrimary: '#F8F4FF',     // Clean off-white for contrast
  textSecondary: '#C6B8E6',   // Muted lavender
  textMuted: '#9487B8',       // Dimmed violet gray
  yellow: '#FDC863',          // Accent yellow from head

  // Feedback Colors
  success: '#6DFDC3',         // Same as mint green accent
  warning: '#FDC863',         // Orange-ish glow
  error: '#FF647C',           // Retro neon red-pink

  // Tabs & Button States
  tabActive: '#FF72B0',
  tabInactive: '#2C2040',
  tabBackground: '#0D0A1A',
  buttonHover: '#FF9ED1',
  tabHover: '#392B50',

  // Light Theme Override
  light: {
    background: '#FFF8FB',
    surface: '#FFFFFF',
    textPrimary: '#1B0A28',
    textSecondary: '#4C395A',
    icon: '#1B0A28',
  },

  // Dark Theme Override
  dark: {
    background: '#0D0A1A',
    surface: '#161123',
    textPrimary: '#F8F4FF',
    textSecondary: '#C6B8E6',
    icon: '#FFFFFF',
  },
};

export const Fonts = {
  regular: 'sans-serif',    // Default system sans-serif font
  medium: 'sans-serif',     // Default system sans-serif font
  bold: 'sans-serif',       // Default system sans-serif font
  fancy: 'sans-serif',      // Default system sans-serif font
};

export const TextStyles = {
  title: {
    fontFamily: Fonts.bold,
    fontSize: 36,
    color: Colors.textPrimary,
    textAlign: 'center' as const,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontFamily: Fonts.fancy,
    fontSize: 20,
    color: Colors.accent,
    textAlign: 'center' as const,
    marginTop: 10,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'left' as const,
  },
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textMuted,
  },
  button: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.primary,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
    textAlign: 'center' as const,
  },
  font_family: "sans-serif",
};
