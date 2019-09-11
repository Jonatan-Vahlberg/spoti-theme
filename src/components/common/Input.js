import React from "react"
import {View, TextInput, Text, StyleSheet} from "react-native"

const Input = ({label,value,onChangeText,placeholder, secureTextEntry, textStyle = {}, inputStyle= {}, containerStyle = {}}) => {

    const {containerStyleBase,inputStyleBase,textStyleBase} = styles
    return(
        <View style={[containerStyleBase, containerStyle]}>
            <Text style={[textStyleBase,textStyle]}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={[inputStyleBase,inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                autoCorrect={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyleBase: {
        height: 50,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    inputStyleBase: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    textStyleBase: {
        fontSize:18,
        paddingLeft: 20,
        flex:1,
    }
})

export {Input}