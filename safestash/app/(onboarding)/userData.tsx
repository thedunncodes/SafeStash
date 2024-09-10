import {View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native';
import BodyView from '@/components/bodyView';
import Header from '@/components/onboarding/header';
import BackBtn from '@/components/backBtn';
import { useAppState } from '@/components/appStates/onboardingFormStates';
import FormInput from '@/components/formInput';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

export default function Data() {
    const { lastName, givenName, setLastName, setGivenName, dateField, country, occupation } = useAppState()

    // Validate form function here

    const handleSubmit = () => {
        // Check for form validation

        router.navigate('/personalization')
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
        padding: 5
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
        marginBottom: 15,
    },
    infoSectionText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 13
    },
    userInfoContainer: {
        paddingLeft: 5,
    },
    labelView: {
        marginBottom: 5,
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
        marginTop: 33,
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