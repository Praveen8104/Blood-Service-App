import { Stack } from 'expo-router';

export default function RootLayout() {
  // In a real app, you'd get this from a 'useAuth' hook or Redux
  const isAuthenticated = false; 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(main)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  );
}