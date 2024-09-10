import { useEffect } from 'react';
import { useNavigation, Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { OnboardingItem } from "@/components/onboardingPageItem";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from "@/components/carousel";
import Colors from "@/constants/Colors";

export default function Index() {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const carouselData: OnboardingItem[] = [
    { id: '1', image: require('@/assets/images/exchange-icon.jpg'), context: 'Expand your international network with USD, EUR, & GBP Accounts at Your Fingertips ' },
    { id: '2', image: require('@/assets/images/banking-icon.jpg'), context: 'Maximize Value with the Best Currency Exchange Rates from Trusted Providers' },
    { id: '3', image: require('@/assets/images/did-image2.jpg'), context: 'Manage Your Digital Credentials with Ease and Privatize Your data' },
    { id: '4', image: require('@/assets/images/spending-insights.jpg'), context: 'Smarter Spending with Personalized Payment Tracking' },
    { id: '4', image: require('@/assets/images/credit-cards-image.jpg'), context: 'Create Debit Cards And Enjoy Effortless Spending with Secure, Global Access' },
  ];

  const insets = useSafeAreaInsets();

  return (
    <View style={ styles.body }>
      <SafeAreaProvider style={[ styles.carouselcontainer, Platform.OS === 'ios'? { paddingTop: insets.top } : { paddingTop: 10 }, { paddingBottom: 0 }]}>
        <Carousel data={carouselData} />
      </SafeAreaProvider>
      <View style={ styles.authContainer }>
        <SafeAreaProvider style={ [styles.authWrapper,  Platform.OS === 'ios'? { paddingBottom: insets.bottom } : { paddingBottom: 10 }, ] } >
            <Link href={{ pathname: "/register" }} asChild style={{ backgroundColor: 'rgb(184, 0, 0)' }}>
                <TouchableOpacity style={styles.authBtn} activeOpacity={0.7} >
                  <Text style={ styles.authBtnText } >Sign up</Text>
                </TouchableOpacity>
            </Link>
            <Link href={{ pathname: "/login" }} asChild style={{ backgroundColor: 'rgba(184, 0, 0, .1)' }}>
                <TouchableOpacity style={ styles.authBtn } activeOpacity={0.7} >
                  <Text style={ [styles.authBtnText, { color: Colors.light.text,  }] } >Login</Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  }, 
  carouselcontainer: {
    flex: 3,
  },
  authContainer: {
    flex: 1,
    backgroundColor: Colors.light.background
  },
  authWrapper: {
    flex: 1,
  },
  authBtn: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 17,
    alignItems: 'center',
    padding: 15,
    borderRadius: 27,
  },
  authBtnText: {
    color: Colors.dark.text,
    fontWeight: '600',
    fontSize: 20,
    fontFamily: 'PoppinsSemiBold',
    width: '100%',
    textAlign: 'center',
  },


})
