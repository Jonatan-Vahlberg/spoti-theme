import React from "react"
import {View, StyleSheet, Dimensions, Text, Image, TouchableWithoutFeedback, Linking} from "react-native"
import { FlatList } from "./common";
import Axios from "axios";
import _ from "lodash"

const SCREEN_HEIGHT = Dimensions.get('screen').height
const WINDOW_WIDTH = Dimensions.get('window').width

class SpotyfiList extends React.Component {
    componentDidMount(){
    }
     render(){
        return(
            <View style={styles.containerStyle}>
                <View style={styles.listStyle}>
                        <FlatList
                            data={this.props.data}
                            renderItem={this.renderItem.bind(this)}
                            keyName="id"/>
                    </View>
            </View>
       )
    }

    renderItem({item}){
        return (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(item.url)}>
                <View style={styles.itemStyle}>
                    <Image source={{uri: item.image}} style={{height: 150,width: 150, opacity: 1}}/>
                    <Text>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    
}

const styles = StyleSheet.create({
    containerStyle:{
        position: "absolute",
        width: WINDOW_WIDTH,
        height: (SCREEN_HEIGHT),
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0

    },
    listStyle: {
        width: 200,
        height: (SCREEN_HEIGHT* 0.5),
        zIndex: 99
    },
    itemStyle:{
        width: 200,
        height: 200,
        backgroundColor: "#rgba(255, 255, 255, 0.85)",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        elevation: 5,
        marginVertical: 5
    }
})

export default SpotyfiList