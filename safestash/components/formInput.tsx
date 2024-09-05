import React, { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import { View, Text, TextInput, Button, StyleSheet, type ViewProps, TouchableOpacity, KeyboardAvoidingView, Modal, Platform, } from 'react-native';
import CountryCodePicker from './countryCodePicker';
import { string } from 'prop-types';

interface InputProps extends ViewProps {
    placeholder?: string ,
    onChangeText?: (text: string) => void,
    value: string,
    codeValue?: string,
    type: 'default' | 'password' | 'email' | 'number' | 'date' | 'country' | 'code',
    secureText?: boolean,
    keyboardType: 'email-address' | 'numeric' | 'default',
}

export default function FormInput({ placeholder, onChangeText, codeValue, value, style, type, secureText, keyboardType, ...rest}: InputProps ) {
    const [countryCode, setCountryCode] = useState('code');
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    let codeValueTemp: string = '';
    if (type === 'code') {
        codeValueTemp = `${codeValue}`
    } 

    return(
        <View style={ styles.container } >
            <CountryCodePicker 
            showModal={false}
            defaultValue={codeValueTemp}
            style={{ borderWidth: 1, width: 50, display: type === 'code'? 'flex' : 'none' }} />

            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'rgba(25, 25, 25, .5)'}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, style]}
                secureTextEntry={secureText}
                autoCorrect={false}
                keyboardType={keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto'
    },
    input: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 2,
        borderWidth: 1,
        borderColor: 'rgba(25,25,25,0.3)',
        elevation: 5,
        height: 35,
        width: '100%',
    }
})

// /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/