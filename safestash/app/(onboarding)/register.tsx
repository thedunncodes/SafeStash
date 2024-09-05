import { Text, View, Platform, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, Link } from "expo-router";
import Colors from '@/constants/Colors';
import BodyView from '@/components/bodyView';
import Header from '@/components/onboarding/header';
import FormInput from '@/components/formInput';
import { useAppState } from '@/components/appStates/onboardingFormStates';

export default function Reg() {
    const { firstName, setFirstName, countryCode, mobileNumber, setMobileNumber} = useAppState()

    return (
        <BodyView style={styles.body}>
            <View style={ styles.loginReroute } >
                <Text style={ styles.loginRerouteText } >Already have an account?<Link href={{ pathname: "/" }}> Login</Link></Text>
            </View>
            <Header>
                Let's Create your account
            </Header>
            <Text style={styles.infoSection} >Please input your E-mail and phone number to begin the process </Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <FormInput placeholder='test1' secureText={false} onChangeText={setFirstName} value={firstName} type='default' keyboardType='default' />
                    <FormInput placeholder='Country Code' secureText={false} onChangeText={setMobileNumber} type='code' value={mobileNumber} codeValue={countryCode} keyboardType='numeric' />
                    <View><Text> Results: Hello {firstName} from {countryCode} your number is {countryCode} {mobileNumber} </Text></View>
                </View>
            </TouchableWithoutFeedback>
        </BodyView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 12,
        backgroundColor: Colors.light.background,
    },
    infoSection: {
        fontFamily: 'PoppinsMedium',
        fontSize: 12.5,
        marginTop: 5,
        lineHeight: 20,
    },
    loginReroute: {
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'flex-end',
    },
    loginRerouteText: {
        fontSize: 12,
    }
})