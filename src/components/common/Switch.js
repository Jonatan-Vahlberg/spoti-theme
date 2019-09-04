import React from "react"
import {Switch, View, Text} from "react-native"

const SwitchComponent = ({label,value,onChange,disabled = false,styles = {switchStyle: {}, containerStyle: {}},color = "#5FC9F8"}) => {

    const {switchStyleBase,containerStyleBase, textStyle} = baseStyles

    const completeSwtichStyle = {...switchStyleBase,...styles.switchStyle}
    const completeContainerStyle = {...containerStyleBase,...styles.containerStyle}

   return(
       <View style={completeContainerStyle}>
           <Text style={textStyle}>{label}</Text>
           <Switch style={completeSwtichStyle}
                value={value}
                onChange={onChange}
                disabled={disabled}/>
       </View>
   )
}

const baseStyles = {
    containerStyleBase: {
        minHeight: 70,
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    textStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 18,
        lineHeight: 23
    },
    switchStyleBase: {
        transform: [{scaleX: 1.4}, {scaleY: 1.4}],

    }
}

export {SwitchComponent as Switch}