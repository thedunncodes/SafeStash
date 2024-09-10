import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, KeyboardAvoidingView } from "react-native";
import { Link, router } from "expo-router";
import BodyView from "@/components/bodyView";
import Header from "@/components/onboarding/header";
import Icon from 'react-native-vector-icons/FontAwesome';
import FormInput from "@/components/formInput";
import Colors from "@/constants/Colors";
import NumToTime from "@/hooks/numToTime";
import BackBtn from "@/components/backBtn";

export default function Verify() {
    const [countdown, setCountdown] = useState(90);
    const [isActive, setIsActive] = useState(false);
    const [ submitted, setSubmitted ] = useState(false)
    // These are to be checked with the OTP stored in the asyncstorage 
    // after user session auth 
    const [ emailOtp, setEmailOtp ] = useState<string>('')
    const [ mobileOtp, setMobileOtp ] = useState<string>('')

    const handleResend = () => {
        // Re-issue code with the states again i haven't wiped them
        // use appstate to bring them back here

        if (submitted) {
            setIsActive(true)
            setCountdown(90)
        }
    }
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && countdown > 0) {
        interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        } else if (countdown === 0) {
            setIsActive(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, countdown])

    const handleSubmit = () => {
        // Confirm states with the stored in OTP,

        // once the codes OTPs are verified and matched clean the states here

        setIsActive(true)
        setSubmitted(true)
        router.push('/userData')
    }

    return (
        <BodyView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={-30}
                    style={ styles.body }
                >
                    <BackBtn pathname="/register" />
                    <Header style={ styles.header } >Verify your E-mail address and Phone number</Header>
                    <View style={styles.verificationContainer}  >
                        <View style={ styles.infoTextVIew } >
                            <Text style={styles.infoText} >
                                Input the 6 digit OTP sent to your email and phone number
                            </Text>
                        </View>
                        <View style={styles.labelView} >
                            <Text style={ styles.labelViewText } >
                                Enter your email OTP.
                            </Text>
                        </View>
                        <FormInput
                            placeholder="_ _ _ _ _ _"
                            type="default" secureText={false}
                            onChangeText={setEmailOtp}
                            keyboardType="numeric"
                            value={emailOtp}
                            maxLength={6}
                            textStyle={ styles.inputTextStyle }
                            style={ styles.inputStyle }
                            containerStyle={ styles.inputContainer }
                        />
                        <View style={styles.labelView} >
                            <Text style={ styles.labelViewText } >
                                Enter your phone number OTP.
                            </Text>
                        </View>
                        <FormInput
                            placeholder="_ _ _ _ _ _"
                            type="default" secureText={false}
                            onChangeText={setMobileOtp}
                            keyboardType="numeric"
                            value={mobileOtp}
                            maxLength={6}
                            textStyle={ styles.inputTextStyle }
                            style={ styles.inputStyle }
                            containerStyle={ styles.inputContainer }
                        />
                        <View>
                            <TouchableOpacity
                                disabled={isActive && submitted? true : false}
                                onPress={handleResend}
                                style={ styles.resendView }
                            >
                                <Text style={ styles.resendViewText } >
                                    {isActive
                                        ? `Resend Code (${NumToTime(countdown)}s)`
                                        : 'Resend Code'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ styles.submitViewContainer } >
                        <TouchableOpacity style={styles.submitView} onPress={handleSubmit} >
                            <Text style={styles.submitViewText} >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </BodyView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    header: {
        textAlign: 'center',
        // backgroundColor: 'red',
        width: '100%',
        lineHeight: 33,
        fontSize: 21,
    },
    infoTextVIew: {
        marginBottom: 10,
        marginTop: 5
    },
    infoText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 20,
        width: '100%',
    },
    verificationContainer: {
        padding: 10,
        flex: 2,
    },
    inputTextStyle: {
        letterSpacing: 7,
    },
    inputStyle: {
        borderRadius: 5,
        paddingLeft: 15,
        borderColor: 'rgba(25,25,25,0.6)'
    },
    inputContainer: {
        marginBottom: 15,
        height: 70,
    },
    submitViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitView: {
        height: 60,
        backgroundColor: Colors.light.darkRed,
        width: '90%',
        justifyContent: 'center',
        borderRadius: 15,
    },
    submitViewText: {
        width: '100%',
        textAlign: 'center',
        color: Colors.dark.text,
        fontSize: 22,
        fontFamily: 'Poppins-Medium'
    },
    labelView: {
        marginBottom: 1,
    },
    labelViewText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13
    },
    resendView: {
        borderBottomWidth: .5,
        borderBottomColor: Colors.light.red,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginLeft: 'auto',
    },
    resendViewText: {
        fontFamily: 'Poppins-Regular',
        width: 'auto',
    },
})