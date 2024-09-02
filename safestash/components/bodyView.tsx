import { View, Platform, StyleSheet, StatusBar, type ViewProps } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import Colors from '@/constants/Colors';

interface BodyViewProps extends ViewProps {
    children: React.ReactNode;
}

export default function BodyView({children, style, ...rest}: BodyViewProps) {

    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.body, style]} >
            <SafeAreaProvider style={[ Platform.OS === 'ios'? { paddingTop: insets.top } : { paddingTop: 10 }, { paddingBottom: 0 }]} >
                {children}
            </SafeAreaProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.light.background,
        marginTop: Platform.OS === 'android'? StatusBar.currentHeight: 0,
    }
})