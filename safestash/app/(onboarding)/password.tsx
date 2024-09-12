import { router } from "expo-router";
import axios from "axios";
import { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import BackBtn from "@/components/backBtn";
import Header from "@/components/onboarding/header";
import BodyView from "@/components/bodyView";
import Colors from "@/constants/Colors";
import FormInput from "@/components/formInput";
import { formValidation, useAppState } from "@/components/appStates/onboardingFormStates";
import errorStyles from "@/constants/errorStyles";


export default function Personalize() {
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const {
        errors, setErrors,
        email, setGivenName,
        setLastName, setCountry,
        setDateField, setOccupation } = useAppState()

    const ValidateForm = () => {
        let errors: formValidation = {}

        if (confirmPass === '' || confirmPass !== password) errors.confirmPass = 'Password Does not match'
        
        if (password.length < 8)  errors.minPassword = "Password can't be less than 8 characters"

        setErrors(errors)

        return Object.keys(errors).length === 0
    }
    
    const handleSubmit = () => {
        // Check for form validation
        if (ValidateForm()) {
            try {
                axios.post('https://flying-still-sunbird.ngrok-free.app/register', {
                    email, password
                })
                    .then(response => {
                        if (response.status === 201) {
                            console.log(response.data);
                            router.navigate('/');
                            router.push('/login');
                            setCountry('')
                            setDateField('')
                            setGivenName('')
                            setLastName('')
                            setOccupation('')
                        }
                    })
                    .catch((err) => {
                        console.error('Verification failed with staus code ->', err.response.status, '<- Message: ', err.response.data)
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
                <BackBtn pathname="/personalization" style={ styles.backBtn } />
                <View style={ styles.container } >
                        <Header style={styles.header} >Set up your Password</Header>
                        <View style={styles.infoSectionView} >
                            <Text style={ styles.infoSectionText } >
                                Provide a password of Minimum of 8 characters to secure your account
                            </Text>
                        </View>
                        <View style={styles.label} >
                                <Text style={styles.labelText} >Password</Text>
                        </View>
                        <FormInput 
                            placeholder="Enter Password"
                            secureText={true}
                            type="password"
                            value={password}
                            onChangeText={setPassword}
                            keyboardType="default"
                            style={ styles.customInput }
                            containerStyle={styles.mainInputContainer}
                        />
                        {
                            errors.minPassword ? <View style={ errorStyles.errorView } >
                                        {errors.minPassword ? <Text style={ errorStyles.errorText } >{errors.minPassword}</Text> : null}
                                    </View> : null
                        }

                        <View style={styles.label} >
                                <Text style={styles.labelText} >Confirm Password</Text>
                        </View>
                        <FormInput 
                            placeholder="Confirm Password"
                            secureText={true}
                            type="password"
                            value={confirmPass}
                            onChangeText={setConfirmPass}
                            keyboardType="default"
                            style={ styles.customInput }
                            containerStyle={styles.mainInputContainer}
                        />
                        {
                            errors.confirmPass ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.confirmPass}</Text></View> : null
                        }

                        <View style={ styles.submitContainer } >
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitView} >
                                <Text style={styles.submitViewText} >
                                    Create Password
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