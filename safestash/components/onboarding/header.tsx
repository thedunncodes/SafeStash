import React from 'react';
import Colors from '@/constants/Colors';
import { View, Text, StyleSheet, type ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {
    // children: React.ReactNode;
    context?: string
}

export default function Header({style,  context, ...rest}: HeaderProps ) {
    return (
        <View style={ styles.header } >
            <Text style={[ styles.text, style ]} {...rest} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.light.background,
        marginTop: 5,
        alignItems: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'red',
        padding: 0,
    },
    text: {
        fontSize: 23,
        fontFamily: 'PoppinsBold',
        color: Colors.light.text,
        // borderWidth: 1,
        // borderColor: 'blue',
    }
})