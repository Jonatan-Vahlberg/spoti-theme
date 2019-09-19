import React from "react"
import {View, StyleSheet, Image} from "react-native"
import firebase from "firebase" 
import { Card, CardSection, Input, Button, Emoji, Spinner } from "./common"
import { Actions } from "react-native-router-flux"

class AuthPage extends React.Component {

    state = {
        email: "",
        password: "",
        loading: false
    }

   render(){
        return(
            <View style={styles.viewStyle}>
                <Image style={styles.imgStyle} source={require("../media/spoti-theme_trans.png")}/>
                <CardSection>
                    <Input label="email"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        placeholder="enter email"
                        inputStyle={{color: "#fff", backgroundColor: "#000"}}
                        textStyle={{color: "#1DB954", backgroundColor: "#000"}}
                        containerStyle={{backgroundColor: "#000"}}/>
                </CardSection>
                <CardSection>
                    <Input label="password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        placeholder="enter password"
                        inputStyle={{color: "#fff", backgroundColor: "#000"}}
                        textStyle={{color: "#1DB954", backgroundColor: "#000"}}
                        containerStyle={{backgroundColor: "#000"}}
                        secureTextEntry={true}/>
                </CardSection>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </View>
        )
    }

    renderButton = () => {
        if(this.state.loading){
            return(
                <Spinner
                    color="#1DB954"
                    backgroundColor="#000"/>
            )
        }
        else{
            return (
                <Button title="Log in"
                buttonStyle={{backgroundColor: "#1DB954"}}
                textStyle={{color: "#fff"}}
                onPress={this.firebaseAuth}/>
            )
        }
    }


    firebaseAuth = () => {
        const {email,password} = this.state
        this.setState({loading: true})
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user}) => {
                this.setState({loading: false})

                Actions.spotifyAuth()

            })
            .catch((err) => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(({user}) => {
                        this.setState({loading: false})
                        Actions.spotifyAuth()
                    })
                    .catch(err => {
                        console.log(err) 
                        this.setState({loading: false})
                    })
            })
    }

}
    const styles = StyleSheet.create({
        viewStyle: {
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            borderColor: "#000",
        },
        imgStyle:{
            width: 250,
            height: 250
        }      
    })

export default AuthPage