import { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "@/components/appStates/authSession";
import BodyView from "@/components/bodyView";

export default function DashBoard() {
    const { userToken } = useAuth()

    useEffect(() => {
        if(!userToken) {
            router.navigate('/login')
        }
    }, [userToken]);

    return (
        <BodyView>
            <View style={ styles.body } >
                <TouchableOpacity style={ styles.offeringBtn } >
                    <Text>
                        Get Offerings
                    </Text>
                </TouchableOpacity>
            </View>
        </BodyView>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offeringBtn: {
        borderWidth: 1,
        borderRadius: 5,
        width: '20%'
    },
    offeringBtnText: {
        width: '100%',
    }
})