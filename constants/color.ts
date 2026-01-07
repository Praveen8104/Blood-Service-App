// constants/Colors.ts

const tintColorLight = '#E21B1B'; // Your primary Blood Red
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#E21B1B',      // Main brand color
    secondary: '#007AFF',    // Request / Action color
    background: '#F8F9FA',   // Screen background
    card: '#FFFFFF',         // Card background
    text: '#1A1A1A',         // Primary text
    textMuted: '#666666',    // Subtitles/labels
    border: '#E8E8E8',       // Input borders
    success: '#4CAF50',
    error: '#FF5252',
    tint: tintColorLight,
    tabIconDefault: '#CCC',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#FF4D4D',
    secondary: '#409CFF',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textMuted: '#AAAAAA',
    border: '#333333',
    tint: tintColorDark,
    tabIconDefault: '#555',
    tabIconSelected: tintColorDark,
  },
};