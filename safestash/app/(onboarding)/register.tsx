import { Text, View, Platform, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { Link, router } from "expo-router";
import axios from 'axios';
import Colors from '@/constants/Colors';
import BodyView from '@/components/bodyView';
import Header from '@/components/onboarding/header';
import FormInput from '@/components/formInput';
import { formValidation, useAppState } from '@/components/appStates/onboardingFormStates';
import errorStyles from '@/constants/errorStyles';


export default function Reg() {
    const {
        email,
        setEmail,
        countryCode,
        mobileNumber,
        setMobileNumber,
        setCountryCode,
        errors,
        setErrors
    } = useAppState()

    const ValidateForm = () => {
        let errors: formValidation = {}
        const email_exp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        const mobile_exp = /^[0-9]+$/

        if (!(email_exp.test(email))) errors.email = 'Valid email required'
        if (countryCode === '+_ _') errors.code = 'Please select your country code'
        // Backend validation required, for now lets use a dummy
        if (!(mobile_exp.test(mobileNumber))) errors.mobileNumber = 'Input a valid phone number'

        setErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
        if (ValidateForm()) {
            try {
                axios.post(`${process.env.NGROK_TUNNEL}/verify`, {email, mobileNumber: `${countryCode}${mobileNumber}`, code: countryCode,})
                    .then(response => {
                        console.log(response.data)
                        router.navigate('/verification')
                    })
                    .catch((err) => {
                        console.error('Verification failed with staus code ->', err.response.status, '<- Message: ', err.response.data)
                        if (err.response.data.message) {
                            errors.mobileNumber = 'Input a valid phone number'
                            setErrors(errors)
                        }
                        if (err.response.data.emailError) {
                            errors.invalidEmail = err.response.data.emailError
                            setErrors(errors)
                        }
                        if (err.response.data.phoneError) {
                            errors.invalidMobile = err.response.data.phoneError
                            setErrors(errors)
                        }
                    })
            } catch(err) {
                console.error('Verification failed', err)
            }
            
            console.log('Submitted:\nEmail: ', email, ' Phone Number: ', countryCode, mobileNumber)
            // setEmail('')
            // setMobileNumber('')
            // setCountryCode('+_ _')
        }

    } 
    

    return (
        <BodyView style={styles.body}>
            <View style={ styles.loginReroute } >
                <Text style={ styles.loginRerouteText } >Already have an account? </Text>
                <View style={ styles.loginRerouteLink } ><Link href={{ pathname: "/" }} style={ styles.loginRerouteText } >Login</Link></View>
            </View>
            <Header>
                Let's Create your account
            </Header>
            <Text style={styles.infoSection} >Please input your E-mail and phone number to begin the process </Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={ styles.formBody }>
                    <View>
                        <View style={styles.label} >
                            <Text style={styles.labelText} >Email address </Text>
                        </View>
                        <FormInput
                            placeholder='Enter your email address'
                            secureText={false} 
                            onChangeText={setEmail}
                            value={email}
                            type='email'
                            keyboardType='email-address'
                            style={ styles.normalInput }
                        />
                        {
                            errors.email || errors.invalidEmail?
                                <View style={ errorStyles.errorView } >
                                    {errors.email? <Text style={ errorStyles.errorText } >{errors.email}</Text> : null}
                                    {errors.invalidEmail ? <Text style={ errorStyles.errorText } >{errors.invalidEmail}</Text> : null}
                                </View> : null
                        }

                        <View style={styles.label} >
                            <Text style={styles.labelText} >Phone Number</Text>
                        </View>
                        <FormInput
                            placeholder='_ _ _ _ _ _ _ _ _ _'
                            secureText={false}
                            onChangeText={setMobileNumber}
                            type='code'
                            value={mobileNumber}
                            codeValue={countryCode}
                            keyboardType='numeric'
                            style={ styles.countryCodeInput }
                            containerStyle={ styles.inputContainer }
                        />
                        {
                            errors.code || errors.mobileNumber || errors.invalidMobile ? <View style={ errorStyles.errorView } >
                                        {errors.code? <Text style={ errorStyles.errorText } >{errors.code}</Text> : null}
                                        {errors.mobileNumber ? <Text style={ errorStyles.errorText } >{errors.mobileNumber}</Text> : null}
                                        {errors.invalidMobile ? <Text style={ errorStyles.errorText } >{errors.invalidMobile}</Text> : null}
                                    </View> : null
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View>
                <TouchableOpacity style={ styles.submitBody } onPress={handleSubmit} >
                    <Text style={ styles.submitBodyText } >Verify</Text>
                </TouchableOpacity>
            </View>
        </BodyView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 12,
        flex: 0,
        height: '100%',
        backgroundColor: Colors.light.background,
    },
    formBody: {
        height: Platform.OS === 'ios'? '60%' : 450,
    },
    submitBody: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 15,
        backgroundColor: Colors.light.darkRed,
    },
    submitBodyText: {
        fontSize: 23,
        fontFamily: 'Poppins-SemiBold',
        color: 'white'
    },
    normalInput: {
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 2,
        borderRadius: 5,
        borderColor: 'rgba(25,25,25,0.6)',
    },
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: 'rgba(25,25,25,0.6)',
        borderRadius: 5,
        marginBottom: 15
    },
    countryCodeInput: {
        width: '86%',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 2,
        borderLeftWidth: 1,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        alignSelf: 'flex-end',
        height: 54,
        borderColor: 'rgba(25,25,25,0.5)',
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
    },
    labelText: {
        color: Colors.light.text,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
    },
    infoSection: {
        fontFamily: 'PoppinsMedium',
        fontSize: 12.5,
        marginTop: 5,
        lineHeight: 20,
        marginBottom: 20,
    },
    loginReroute: {
        marginTop: 10,
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    loginRerouteText: {
        fontSize: 12,
    },
    loginRerouteLink: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.red,
        position: 'relative',
    },
    
})