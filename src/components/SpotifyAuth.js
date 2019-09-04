import React from "react"
import {View,Text, StyleSheet} from "react-native" 
import { Actions } from "react-native-router-flux";
import { AuthSession } from "expo";
import _ from "lodash"
import {connect} from "react-redux"

import {CardSection, Button } from "./common";
import {SpotyfiCredentials} from "../../secret"
import {spotifyAuthSuccess} from "../actions"


class SpotifyAuth extends React.Component {

    state= {error: false}
   render(){
       return(
           <View style={styles.container}>
                <Text style={styles.text}>This app Requires Spotify Authentication</Text>
                <CardSection>

                    <Button title="Authenticate"
                        buttonStyle={{backgroundColor: "#1DB954"}}
                        textStyle={{color: "#fff"}}
                        onPress={this.authorizeSpotyfi.bind(this)}/>
                </CardSection>
                {this.renderError()}
           </View>
       )
    }

    renderError(){
        if(this.state.error){
            return (
                <CardSection
                    style={{justifyContent: "center", alignItems: "center", backgroundColor: "#000"}}>
                    <Text style={[styles.text,{color: "red"}]}>Account not authenticated try again</Text>
                </CardSection>
            )
        }
    }

    authorizeSpotyfi = async () => {
        let redirectUrl = AuthSession.getRedirectUrl()
        let results = await AuthSession.startAsync({
            authUrl:
            `https://accounts.spotify.com/authorize?client_id=${SpotyfiCredentials.clientID}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=user-read-private%20user-read-email&response_type=token&state=123`
          })

        if(results.type !== 'success'){
            this.setState({error: true})
            
        }
        else{
            this.props.spotifyAuthSuccess(results.params.access_token)
            Actions.tabs({type: "reset"})
            
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        flex: 1
    },
    text: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default connect(null,{spotifyAuthSuccess}) (SpotifyAuth)