import React from "react"
import {View,Text} from "react-native"

const CardSection = ({children,style = {}}) =>{
    
        const {containerStyle} = styles

        
        return (
            <View style={[containerStyle, style]}>
                {children}
            </View>
        )
}

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: "#ddd",
        position: 'relative' 

    }
}

export {CardSection}