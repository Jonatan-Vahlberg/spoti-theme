import React from "react"
import {Dimensions, Text, StyleSheet, Image, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import _ from "lodash" 
import { Button, FlatList, CardSection, Confirm } from "./common"
import { Actions } from "react-native-router-flux"

import {removeTheme,removePlaylists} from "../actions"

const SCREEN_HEIGHT = Dimensions.get('screen').height

class OverviewPage extends React.Component {

    state = {visible: false, item: null}
    render(){
        console.log(this.state)
        const {themes} = this.props
        return(
           <React.Fragment>
                <CardSection
                    style={{height: SCREEN_HEIGHT * 0.50, margin: 20}}>
                    <FlatList
                        data={themes}
                        renderItem={this.renderTheme}
                        keyName="id"
                    />
                </CardSection>
                {this.renderAddButton()}
                <CardSection>
                    <Button title="Refresh Token"
                        buttonStyle={{backgroundColor: "#1DB954"}}
                        textStyle={{color: "#fff"}}/>
                </CardSection>
                <CardSection>
                    <Button
                        title="Log Out"
                        buttonStyle={{backgroundColor: "red"}}
                        textStyle={{color: "#fff"}}/>
                </CardSection>
               {this.renderModal()}
           </React.Fragment>
        )
    }
    renderAddButton(){
        if(this.props.themes.length > 9){
            return (
                <CardSection>
                    <Text style={{fontSize: 20, marginHorizontal: 10}}>A user can have a maximum of ten themes at once </Text>
                </CardSection>
            )
        }
        else{
            return(

                <CardSection>
                    <Button title="Add new theme"
                        onPress={this.addTheme}/>
                </CardSection>
            )
        }
    }
    renderTheme = ({item}) => {
        console.log(item)
        const {itemContainer,itemText, imgStyle, buttonStyle} = styles
        return (
            <TouchableOpacity onPress={() => this.updateTheme(item)}>
                <CardSection style={itemContainer}>
                    <CardSection>
                        <Image style={imgStyle} source={{uri: item.uri}}/>
                        <Text style={itemText}>{item.name}</Text>
                    </CardSection>
                        
                    <Text>Spotify Term: {item.query}</Text>
                    <View style={buttonStyle}>
                        <TouchableOpacity onPress={() => this.setState({item,visible: true})}>
                            <Text style={{fontSize: 25}}>🗑</Text>
                        </TouchableOpacity>
                    </View>
                </CardSection>
            </TouchableOpacity>
        )
    }

    addTheme = () => {
        Actions.add({title: "Add New Theme"})
    }
    updateTheme = (theme) => {
        Actions.add({title: "Update Theme", theme})
    }

    removeTheme = async (theme) => {
        await this.props.removeTheme(theme.id)
        this.props.removePlaylists(theme.id)
        this.setState({visible: false})


    }

    renderModal = () => {
        const {item} = this.state
        if(item === null || item === undefined){
            return  null
        }
        return (
            <Confirm
                children={`Do you wish to delete the ${item.name} theme?`}
                onConfirm={() => this.removeTheme(item)}
                onAbort={() => this.setState({visible: false})}
                visible={this.state.visible}/>
        )
    }
}



const styles = StyleSheet.create({
    itemContainer: {
        minHeight: 60,
        padding: 5,
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 10,
        position: "relative"
    },
    itemText: {
        fontSize: 20
    },
    imgStyle: {
        height: 50,
        width: 50,
        marginRight: 10
    },
    buttonStyle:{
        position: "absolute",
        zIndex: 20,
        right: 0,
        top: 0,
        bottom: 0,
        marginVertical: 10,
        padding: 5
    }
})

const mapStateToProps = (state,ownProps) => {
    const themes = _.map(state.data,(val,id) => {return {...val,id}})
    return {themes}
}

export default connect(mapStateToProps,{removeTheme,removePlaylists})(OverviewPage)