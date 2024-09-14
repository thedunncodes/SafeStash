import { Stack } from "expo-router";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StateProvider } from "@/components/appStates/onboardingFormStates";
import { AuthProvider } from "@/components/appStates/authSession";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  async function Prepare() {
    useEffect(() => {
      if (loaded) {
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 1500);
        
      }
    }, [loaded]);
  
    if (!loaded) {
      return null;
    }
  }

  Prepare()

  return (
    <AuthProvider>
      <StateProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" options={{ title: 'Onboarding' }} />
        </Stack>
      </StateProvider>
    </AuthProvider>
  );
}
