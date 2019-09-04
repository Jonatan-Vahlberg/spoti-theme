import React from "react" 
import {View, StyleSheet, TouchableOpacity, Text} from "react-native" 
const FloatingButton = ({title, onPress,color = "#fff", backgroundColor = "#5FC9F8"}) => {
   return(
    <TouchableOpacity onPress={onPress} style={{...styles.buttonStyle,backgroundColor}}>
        <View>
            <Text style={{...styles.textStyle,color}}>{title}</Text>
        </View>
    </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
    buttonStyle:{
        position: "absolute",
        width: 60,
        height: 60,
        borderRadius: 30,
        bottom: 10,
        right: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textStyle: {
        fontSize: 40,
        fontWeight: "900"
    }
})

export {FloatingButton}