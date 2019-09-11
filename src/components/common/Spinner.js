import React from "react"
import {View, ActivityIndicator} from "react-native"

const Spinner = ({size, color, backgroundColor = "#fff"}) => {
    return (
        <View style={[styles.containerStyle,{backgroundColor}]}>
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