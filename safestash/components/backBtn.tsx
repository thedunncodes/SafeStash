import { Link, Routes, router } from "expo-router";
import { View, Text, StyleSheet, ViewProps, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "@/constants/Colors";

interface btnProps extends ViewProps {
    text?: string;
    pathname?: Routes;
}

export default function BackBtn({ text, pathname, style }: btnProps) {
    const handleBack = () => {
        router.navigate({ pathname: `${pathname? pathname : '/'}` })
    }

    return (
        <TouchableWithoutFeedback onPress={handleBack} >
            <View style={[styles.backBtnContainer, style]} >
                <View style={{ height: '100%', justifyContent: 'center', paddingTop: 2 }} >
                    <Icon name="chevron-left" size={18} style={{ color: Colors.light.red }} />
                </View>
                <View style={styles.backBtnView} >
                    <Text style={styles.backBtnText} >{ text? text : 'Back' }</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    backBtnContainer: {
        marginLeft: 5,
        marginBottom: 25,
        flexDirection: 'row',
        height: 22   
    },
    backBtnText: {
        fontSize: 17,

    },
    backBtnView: {
        marginLeft: 4,
        paddingTop: 0,
    },
});