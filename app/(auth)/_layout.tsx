import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="loginscreen" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="signupscreen" options={{ title: 'Create Account', headerShown: false }} />
    </Stack>
  );
}