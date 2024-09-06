import React, { useState, useEffect } from 'react';
import Colors from '@/constants/Colors';
import { View, Text, TextInput, Keyboard, StyleSheet, type ViewProps, TouchableOpacity, KeyboardAvoidingView, Modal, Platform, } from 'react-native';
import CountryCodePicker from './countryCodePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from '@/components/datePicker';

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
    const [showEye, setShowEye] = useState(false);
    const [passShow, setPassShow] = useState(secureText);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState<Date>()

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
                secureTextEntry={passShow}
                autoCorrect={false}
                keyboardType={keyboardType}
                onFocus={() => {
                    if(type === 'date') {
                        Keyboard.dismiss()
                        console.log('yes')
                    }
                }}
            />
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
        height: 80,
        // backgroundColor: 'blue',
        marginBottom: 10,
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