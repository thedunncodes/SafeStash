import React, { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import { View, Text, TextInput, Keyboard, StyleSheet, type ViewProps, StyleProp, TouchableOpacity, KeyboardAvoidingView, Modal, Platform, ViewStyle, TextStyle, } from 'react-native';
import CountryCodePicker from './countryCodePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@/components/datePicker';
import { useAppState } from './appStates/onboardingFormStates';

interface InputProps extends ViewProps {
    placeholder?: string ,
    onChangeText?: (text: string) => void,
    containerStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    value: string,
    codeValue?: string,
    type: 'default' | 'password' | 'email' | 'date' | 'code',
    secureText?: boolean,
    keyboardType: 'email-address' | 'numeric' | 'default',
    maxLength?: number
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
    const { errors, setErrors } = useAppState()

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
                        // If blocks should be updated as errors to be validated increases and
                        // how they fit into available types
                        if (type === 'default') {
                            errors.email? errors.email = undefined : undefined;
                        }
                        
                    }}
                    style={[{ color: Colors.light.text, flex: 1, }, textStyle]}
                    secureTextEntry={passShow}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    maxLength={type === 'code'? 17 : maxLength || undefined}
                    onFocus={() => {
                        if(type === 'date') {
                            Keyboard.dismiss()
                        }
                    }}
                />
            </View>
            <TouchableOpacity onPress={toggleEye} style={{ display: type === 'password'? 'flex' : 'none' }} >
               <Icon name='eye-slash' size={25} color={Colors.light.text} style={{ display: showEye? 'none' : 'flex' }} />
               <Icon name='eye' size={25} color={Colors.light.text} style={{ display: showEye? 'flex' : 'none' }} />
            </TouchableOpacity>

            <DatePicker style={{ display: type === 'date'? 'flex' : 'none' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        // backgroundColor: 'blue',
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(25,25,25,0.3)',
        // elevation: 5,
        height: 55,
        width: '100%',
    }
})