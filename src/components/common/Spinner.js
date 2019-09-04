import React from "react"
import {View, ActivityIndicator} from "react-native"

const Spinner = ({size, color}) => {
    return (
        <View style={styles.containerStyle}>
            <ActivityIndicator size={size || "large"} color={color || "lightblue"} />
        </View>
    )
}

const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}

export {Spinner}