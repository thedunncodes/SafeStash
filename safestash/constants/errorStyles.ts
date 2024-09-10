import { StyleSheet } from "react-native";
import Colors from "./Colors";

const errorStyles = StyleSheet.create({
    errorView: {
        borderBottomWidth: .5,
        borderBottomColor: Colors.light.red,
        height: 'auto',
        marginBottom: 1,
    },
    errorText: {
        fontSize: 12,
        padding: 1,
        textAlign: 'center'
    },
})

export default errorStyles;