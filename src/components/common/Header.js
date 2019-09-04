import React from 'react'

import ReactNative, {Text, View} from 'react-native'


const Header = ({headerTitle}) => {
    const {textStyle, viewStyle} = styles
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{headerTitle}</Text>
        </View>
    )
}

const styles = {
    textStyle: {
        fontSize: 30,
        fontWeight: "bold",
    },
    viewStyle: {
        backgroundColor: "#f8f8f8",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        paddingTop: 15,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        elevation: 2,
        position: "relative"


    }
}

export {Header}