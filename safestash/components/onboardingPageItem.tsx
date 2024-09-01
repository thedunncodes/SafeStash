import { Text, Image, Dimensions, View, StyleSheet, Platform} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/Colors";

const { width: windowWidth } = Dimensions.get('window')
const pad: number = 0

export type OnboardingItem = {
    id: string,
    image: string,
    context: string,
}

export const OnboardingPageItem = (item: OnboardingItem) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.imageWrapper}>
                    <Image source={ typeof item.image === 'string'? { uri: item.image } : item.image } style={styles.image} />
                </View>
            </View>
            <View style={styles.textWrapper} >
                <Text style={styles.text} >{item.context}</Text>
            </View>
            <LinearGradient
                colors={['rgba(237, 242, 244, 0)', 'rgba(237, 242, 244, .1)', 'rgba(237, 242, 244, 1)' ]}
                style={styles.gradient}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    wrapper: {
        height: '100%',
        width: windowWidth - pad,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    imageWrapper: {
        flex: 1,
        width: windowWidth - pad,
    },
    textWrapper: {
        flex: 1,
        width: windowWidth - pad,
        alignSelf: 'center',
        padding: 10,
        zIndex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    text: {
        fontSize: windowWidth > 390? 27 : 22,
        color: Colors.light.text,
        fontFamily: 'San Serif',
        fontWeight: '900',
        textAlign: 'center',
        flex: 1,
        marginTop: windowWidth > 390? 35 : 40,

    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '75%',
      }

})