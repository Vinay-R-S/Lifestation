export const Colors = {
    // Base
    background: '#0A0D1A',      // Deep midnight blue
    surface: '#11182A',         // Dark navy surface
    overlay: '#1A2238',         // Layered navy-blue depth
    border: '#23314D',          // Muted steel-blue border
  
    // Accents (All Blue Tones)
    primary: '#4F80FF',         // Lighter, vibrant blue (for primary actions)
    secondary: '#6A92D3',       // Soft cool blue (for secondary actions)
    accent: '#80A9FF',          // Soft neon blue for subtle glow
  
    // Text (Dark blue family tones, plus lighter tones)
    textPrimary: '#A2B9FF',     // Light periwinkle blue
    textSecondary: '#B3C9FF',   // Soft powder blue
    textMuted: '#7F95B1',       // Soft slate blue
    yellow: '#4F80FF',          // Replaced yellow with the same blue tone
  
    // Feedback (Still blue-hued for mood)
    success: '#2F6BCF',         // Bluish teal for success
    warning: '#4477DD',         // Medium blue for warnings
    error: '#5566CC',           // Soft blue instead of red
  
    // Tabs & Buttons
    tabActive: '#4F80FF',       // Lively blue for active tab
    tabInactive: '#1A2238',     // Dark navy for inactive tab
    tabBackground: '#0A0D1A',   // Deep background for tab container
  
    // Hover
    buttonHover: '#6A92D3',     // Hover color for buttons (muted blue)
    tabHover: '#334D77',        // Hover effect for tabs (darker blue)
  };
  
  export const Fonts = {
    regular: 'SpaceMono-Regular',
    bold: 'Orbitron-Bold',
    fancy: 'VT323-Regular',
  };
  
  export const TextStyles = {
    title: {
      fontFamily: Fonts.bold,
      fontSize: 24,
      color: Colors.textPrimary,
      fontWeight: 'bold',
    },
    subtitle: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: Colors.textSecondary,
      fontWeight: '600',
    },
    body: {
      fontFamily: Fonts.regular,
      fontSize: 16,
      color: Colors.textPrimary,
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
    },
  };
  