import { router } from 'expo-router';
import {View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import BodyView from '@/components/bodyView';
import Header from '@/components/onboarding/header';
import BackBtn from '@/components/backBtn';
import { formValidation, useAppState } from '@/components/appStates/onboardingFormStates';
import FormInput from '@/components/formInput';
import Colors from '@/constants/Colors';
import errorStyles from '@/constants/errorStyles';

export default function Data() {
    const {
        lastName, givenName,
        setLastName, setGivenName,
        dateField, country,
        occupation, errors,
        setErrors, email,
        countryCode, setCountryCode
    } = useAppState()

    const ValidateForm = () => {
        let errors: formValidation = {}

        if (givenName === '') errors.givenName = 'First And Middle Name Required'
        
        if (lastName === '')  errors.lastName = "Last Name Required"

        if (dateField === '')  errors.dateField = "Date Of Birth Required"

        if (country === '')  errors.country = "Nationality Required"

        if (occupation === '')  errors.occupation = "Occupation Required"

        setErrors(errors)

        return Object.keys(errors).length === 0
    }

    const handleSubmit = () => {
        // Check for form validation
        if (ValidateForm()) {
            try {
                axios.post(`${process.env.NGROK_TUNNEL}/userProfile`, {
                    email, givenName, lastName, dob: dateField, country, occupation, code: countryCode
                })
                    .then(response => {
                        if (response.status === 201) {
                            router.navigate('/personalization')
                            setCountryCode('+_ _')
                        }
                    })
                    .catch((err) => {
                        console.error('Verification failed with staus code ->', err.response.status, '<- Message: ', err.response.data)
                    })
            } catch(err) {
                console.error('Verification failed', err)
            }
            // router.navigate('/personalization')
        }
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView style={ styles.body } >
                <BodyView>
                        <BackBtn style={styles.backbtn} pathname='/' />
                        <View style={styles.userInfoContainer} >
                            <Header style={styles.header} >Personal Information</Header>
                            <View style={styles.infoSectionView} >
                                <Text style={styles.infoSectionText} >
                                    <Text style={{ fontWeight: 'bold', fontFamily: 'Poppins-SemiBold' }} >Important!: </Text>
                                    The information provided below will be checked with your details on the provided means of verification. Please make sure they match!
                                </Text>
                            </View>

                            <View style={styles.labelView} >
                                <Text style={ styles.labelViewText } >
                                    First Name and Middle Name(if present)
                                </Text>
                            </View>
                            <FormInput 
                                placeholder='Enter given names'
                                type='default'
                                secureText={false}
                                value={givenName}
                                onChangeText={setGivenName}
                                keyboardType='default'
                                maxLength={40}
                                style={ styles.normalInput }
                            />
                            {
                                errors.givenName ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.givenName}</Text></View> : null
                            }

                            <View style={styles.labelView} >
                                <Text style={ styles.labelViewText } >
                                    Last Name(Surname)
                                </Text>
                            </View>
                            <FormInput 
                                placeholder='Enter your last name'
                                type='default'
                                secureText={false}
                                value={lastName}
                                onChangeText={setLastName}
                                keyboardType='default'
                                maxLength={25}
                                style={ styles.normalInput }
                            />
                            {
                                errors.lastName ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.lastName}</Text></View> : null
                            }

                            <View style={styles.labelView} >
                                <Text style={ styles.labelViewText } >
                                    Date of Birth
                                </Text>
                            </View>
                            <FormInput 
                                placeholder='DD-MM-YY'
                                type='date'
                                secureText={false}
                                value={dateField}
                                keyboardType='default'
                                maxLength={30}
                                style={ styles.customInput }
                                containerStyle={styles.mainInputContainer}                   
                            />
                            {
                                errors.dateField ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.dateField}</Text></View> : null
                            }

                            <View style={styles.labelView} >
                                <Text style={ styles.labelViewText } >
                                    Nationality
                                </Text>
                            </View>
                            <FormInput 
                                placeholder='Select your Country'
                                type='country'
                                secureText={false}
                                value={country}
                                keyboardType='default'
                                style={ styles.customInput }
                                containerStyle={styles.mainInputContainer}
                            />
                            {
                                errors.country ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.country}</Text></View> : null
                            }

                            <View style={styles.labelView} >
                                <Text style={ styles.labelViewText } >
                                    Occupation
                                </Text>
                            </View>
                            <FormInput 
                                placeholder='Select your occupation'
                                type='job'
                                secureText={false}
                                value={occupation}
                                keyboardType='default'
                                style={ styles.customInput }
                                containerStyle={styles.mainInputContainer}
                            />
                            {
                                errors.occupation ? <View style={ errorStyles.errorView } ><Text style={ errorStyles.errorText } >{errors.occupation}</Text></View> : null
                            }
                        </View>

                        <View style={ styles.submitContainer } >
                            <TouchableOpacity  onPress={handleSubmit} style={styles.submitView} >
                                <Text style={styles.submitViewText} >
                                    Submit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                </BodyView>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 5,
        paddingBottom: 65
    },
    header: {
        fontSize: 29,
    },
    backbtn: {
        marginLeft: 0,
        marginBottom: 5,
    },
    infoSectionView: {
        marginTop: 12,
        marginBottom: 10,
    },
    infoSectionText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13
    },
    userInfoContainer: {
        padding: 15,
    },
    labelView: {
        marginBottom: 5,
        marginTop: 10,
    },
    labelViewText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12.7,
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
        fontFamily: 'Poppins-Medium',
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
        marginTop: 45,
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