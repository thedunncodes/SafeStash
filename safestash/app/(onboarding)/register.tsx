import { Text, View, Platform, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, Link } from "expo-router";
import Colors from '@/constants/Colors';
import BodyView from '@/components/bodyView';
import Header from '@/components/onboarding/header';

export default function Reg() {

    return (
        <BodyView style={styles.body}>
            <View style={ styles.loginReroute } >
                <Text style={ styles.loginRerouteText } >Already have an account?<Link href={{ pathname: "/" }}> Login</Link></Text>
            </View>
            <Header>
                Let's Create your account
            </Header>
            <Text style={styles.infoSection} >Please input your E-mail and phone number to begin the process </Text>
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