import React from "react"
import {View, TextInput, Text} from "react-native"

const Input = ({label,value,onChangeText,placeholder, secureTextEntry}) => {

    const {containerStyle,inputStyle,textStyle} = styles
    return(
        <View style={containerStyle}>
            <Text style={textStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                autoCorrect={false}
            />
        </View>
    )
}

const styles = {
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    textStyle: {
        fontSize:18,
        paddingLeft: 20,
        flex:1
    }
}

export {Input}