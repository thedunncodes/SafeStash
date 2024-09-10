import React, { useState, useEffect } from 'react';
import { useAppState } from './appStates/onboardingFormStates';
import { View, Text, TextInput, Keyboard, StyleSheet, type ViewProps, StyleProp, TouchableOpacity, KeyboardAvoidingView, Modal, Platform, ViewStyle, TextStyle, } from 'react-native';
import Colors from '@/constants/Colors';
import CountryCodePicker from './countryCodePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@/components/datePicker';
import CountryPicker from './countryPicker';
import OccupationPicker from './onboarding/occupationPicker';

interface InputProps extends ViewProps {
    placeholder?: string ;
    onChangeText?: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    value: string;
    codeValue?: string;
    type: 'default' | 'password' | 'email' | 'date' | 'code' | 'country' | 'job';
    secureText?: boolean;
    keyboardType: 'email-address' | 'numeric' | 'default';
    maxLength?: number;
}

export default function FormInput({
        placeholder, onChangeText,
        codeValue, value,
        containerStyle, style,
        type, secureText,
        keyboardType, maxLength,
        textStyle, ...rest
    }: InputProps ) {
    const [showEye, setShowEye] = useState(false);
    const [passShow, setPassShow] = useState(secureText);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState<Date>()
    const { errors, setErrors, occupation, country, givenName, lastName } = useAppState()

    let codeValueTemp: string = '';
    if (type === 'code') {
        codeValueTemp = `${codeValue}`
    };

    const toggleEye = () => {
        if (showEye) {
            setShowEye(false);
            setPassShow(true)
        } else {
            setShowEye(true);
            setPassShow(false);
        }
    }


    return(
        <View style={ [styles.container, containerStyle] } >
            <CountryCodePicker 
            showModal={false}
            defaultValue={codeValueTemp}
            style={{ justifyContent: 'center', alignItems: 'center', width: 51, display: type === 'code'? 'flex' : 'none' }} />

            <View style={[styles.input, style]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(25, 25, 25, .5)'}
                    value={value}
                    onChangeText={(text) => {
                        if (onChangeText) onChangeText(text);
                        if ( type === 'code' ) {
                            errors.code? errors.code = undefined : undefined;
                            errors.mobileNumber? errors.mobileNumber = undefined : undefined;
                        }

                        if (type === 'default') {
                            errors.email? errors.email = undefined : undefined;
                            givenName.length > 0? errors.givenName = undefined : undefined;
                            lastName.length > 0? errors.lastName = undefined : undefined;
                        }

                        if (type === 'password') {
                            errors.confirmPass? errors.confirmPass = undefined : undefined;
                            errors.minPassword? errors.minPassword = undefined : undefined;
                        }
                        
                    }}
                    style={[{ color: Colors.light.text, flex: 1, }, textStyle]}
                    secureTextEntry={passShow}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    maxLength={type === 'code'? 17 : maxLength || undefined}
                    onFocus={() => {
                        if(type === 'date' || type === 'country' || type === 'job') {
                            Keyboard.dismiss()
                        }
                    }}
                />
            </View>
            <TouchableOpacity onPress={toggleEye} style={{ justifyContent: 'center', alignItems: 'center', width: 51, display: type === 'password'? 'flex' : 'none' }} >
               <Icon name='eye-slash' size={25} color={Colors.light.text} style={{ display: showEye? 'none' : 'flex' }} />
               <Icon name='eye' size={25} color={Colors.light.text} style={{ display: showEye? 'flex' : 'none' }} />
            </TouchableOpacity>

            <DatePicker style={{ display: type === 'date'? 'flex' : 'none' }} />

            <CountryPicker
                showModal={false}
                defaultValue={country}
                style={{ justifyContent: 'center', alignItems: 'center', width: 51, display: type === 'country'? 'flex' : 'none' }}
            />

            <OccupationPicker
                showModal={false}
                defaultValue={occupation}
                style={{ justifyContent: 'center', alignItems: 'center', width: 51, display: type === 'job'? 'flex' : 'none' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(25,25,25,0.3)',
        height: 55,
        width: '100%',
    }
})