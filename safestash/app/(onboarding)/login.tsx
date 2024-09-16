import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import BackBtn from "@/components/backBtn";
import Header from "@/components/onboarding/header";
import BodyView from "@/components/bodyView";
import Colors from "@/constants/Colors";
import FormInput from "@/components/formInput";
import { formValidation, useAppState } from "@/components/appStates/onboardingFormStates";
import errorStyles from "@/constants/errorStyles";
import { useAuth } from "@/components/appStates/authSession";



export default function Personalize() {
    const [ password, setPassword ] = useState<string>('')

    const { errors, setErrors, email, setEmail } = useAppState()
    const { login, userInfo } = useAuth()

    const ValidateForm = () => {
        let errors: formValidation = {}
        const email_exp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

        if (!(email_exp.test(email))) errors.email = 'Valid email required'
        
        if (password.length < 8)  errors.minPassword = "Password can't be less than 8 characters"

        setErrors(errors)

        return Object.keys(errors).length === 0
    }
    
    const handleSubmit = () => {
        if (ValidateForm()) {
            try {
                axios.post(`${process.env.NGROK_TUNNEL}/login`, {
                    email, password
                })
                    .then(response => {
                        login(response.data.token, response.data.userData)
                        router.navigate('/dashboard')
                        setEmail('')
                        setPassword('')
                    })
                    .catch((err) => {
                        if (err.response.data.error) {
                            errors.invalidEmail = err.response.data.error
                            setErrors(errors)
                        }
                        if (err.response.data.passwordError) {
                            errors.invalidPassword = err.response.data.passwordError
                            setErrors(errors)
                        }
                    })
            } catch(err) {
                console.error('Verification failed', err)
            }
        }
    }
    
    return(
        <BodyView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={ styles.body } >
                <BackBtn pathname="/" style={ styles.backBtn } />
                <View style={ styles.container } >
                        <Header style={styles.header} >Log Into Your Account </Header>
                        <View style={styles.infoSectionView} >
                            <Text style={ styles.infoSectionText } >
                                Provide your email address and password to gain access to your account
                            </Text>
                        </View>
                        <View style={styles.label} >
                                <Text style={styles.labelText} >Email address</Text>
                        </View>
                        <FormInput 
                            placeholder="Enter your email address"
                            secureText={false}
                            type="email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            style={ styles.normalInput }
                        />
                        {
                            errors.email || errors.invalidEmail ? <View style={ errorStyles.errorView } >
                                        {errors.email ? <Text style={ errorStyles.errorText } >{errors.email}</Text> : null}
                                        {errors.invalidEmail ? <Text style={ errorStyles.errorText } >{errors.invalidEmail}</Text> : null}
                                    </View> : null
                        }

                        <View style={styles.label} >
                                <Text style={styles.labelText} >Password</Text>
                        </View>
                        <FormInput 
                            placeholder="Enter your Password"
                            secureText={true}
                            type="password"
                            value={password}
                            onChangeText={setPassword}
                            keyboardType="default"
                            style={ styles.customInput }
                            containerStyle={styles.mainInputContainer}
                        />
                        {
                            errors.minPassword || errors.invalidPassword ?
                                <View style={ errorStyles.errorView } >
                                    {errors.minPassword ? <Text style={ errorStyles.errorText } >{errors.minPassword}</Text> : null}
                                    {errors.invalidPassword ? <Text style={ errorStyles.errorText } >{errors.invalidPassword}</Text> : null}
                                </View> : null
                        }
                        <TouchableOpacity
                                style={ styles.resendView }
                        >
                            <Text style={ styles.resendViewText } >
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <View style={ styles.submitContainer } >
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitView} >
                                <Text style={styles.submitViewText} >
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </BodyView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 5,
        flex: 1
    },
    container: {
        padding: 5,
    },
    header: {
        fontSize: 29,
    },
    backBtn: {
        marginBottom: 15,
    },
    infoSectionView: {
        marginTop: 10,
        marginBottom: 20,
    },
    infoSectionText: {
        fontFamily: 'PoppinsMedium',
        fontSize: 13,
        lineHeight: 20,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
    },
    labelText: {
        color: Colors.light.text,
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
    },
    normalInput: {
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 2,
        borderRadius: 5,
        borderColor: 'rgba(25,25,25,0.6)',
    },
    customInput: {
        width: '86%',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingRight: 2,
        borderWidth: 0,
        alignSelf: 'flex-end',
        height: 54,
        
    },
    mainInputContainer: {
        flexDirection: 'row',
        height: 55,
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: 'rgba(25,25,25,0.6)',
        borderRadius: 5,
        marginBottom: 15
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
    submitContainer: {
        alignItems: 'center',
        marginTop: 153,
    },
    submitView: {
        width: '92%',
        backgroundColor: Colors.light.darkRed,
        borderRadius: 15,
        height: 60,
        justifyContent: 'center',
    },
    submitViewText: {
        width: '100%',
        textAlign: 'center',
        color: Colors.dark.text,
        fontSize: 22,
        fontFamily: 'Poppins-Medium'
    },
})