import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="verification" options={{ title: 'Verification' }} />
      <Stack.Screen name="userData" options={{ title: 'Profile Data' }} />
      <Stack.Screen name="personalization" options={{ title: 'Personalization' }} />
      <Stack.Screen name="password" options={{ title: 'Password' }} />
    </Stack>
  );
}
