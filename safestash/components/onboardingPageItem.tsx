import { Text, Image, View, StyleSheet} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Colors from "@/constants/Colors";

type OnboardingItem = {
    id: string,
    images: string,
    context: string,
}

const OnboardingPageItem = (props: OnboardingItem) => {
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: props.images }} style={styles.image} />
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']}
                    style={styles.gradient}
                />
            </View>
            <View style={styles.textWrapper} >
                <Text style={styles.text} >${props.context}</Text>
            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1
    },
    imageWrapper: {
        flex: 5,
        position: 'relative',
    },
    textWrapper: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    text: {
        fontSize: 30,
        color: Colors.light.text,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '20%',
      }

})
