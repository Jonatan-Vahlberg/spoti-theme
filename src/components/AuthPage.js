import React from "react"
import firebase from "firebase" 
import { Card, CardSection, Input, Button, Emoji } from "./common"
import { Actions } from "react-native-router-flux"

class AuthPage extends React.Component {

    state = {
        email: "",
        password: ""
    }

   render(){
       return(
           <Card>
               <CardSection>
                   <Input label="email"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        placeholder="enter email"/>
               </CardSection>
               <CardSection>
                   <Input label="password"
                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        placeholder="enter password"/>
               </CardSection>
               <CardSection>
                   <Button title="Log in"
                        onPress={this.firebaseAuth}/>
               </CardSection>
               <Emoji symbol="❤" label="heart"/>
           </Card>
       )
    }


    firebaseAuth = () => {
        const {email,password} = this.state
        firebase.auth().signInWithEmailAndPassword('jonatan.ramses.vahlberg@gmail.com','Password')
            .then(({user}) => {
                Actions.spotifyAuth()

            })
            .catch((err) => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(({user}) => {
                        Actions.spotifyAuth()
                    })
                    .catch(err => console.log(err))
            })
    }
}

export default AuthPage