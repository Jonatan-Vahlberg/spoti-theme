import React from "react" 
import {connect} from "react-redux"
import { Card, CardSection, Input, Button } from "./common";

import {addTheme} from "../actions"

class AddThemePage extends React.Component {
    componentDidMount(){
        this.generateId()
    }
    state = {
        name: "",
        spotifyQuery: "",
        uri: "",
        id: ""
    }

    render(){
        const {name,spotifyQuery,uri,id} = this.state
        return(
           
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        value={name}
                        onChangeText={(name) => this.setState({name})}/>
                </CardSection>
                <CardSection>
                    <Input
                        label="Spotify Query"
                        value={spotifyQuery}
                        onChangeText={(spotifyQuery) => this.setState({spotifyQuery})}/>
                </CardSection>
                <CardSection>
                    <Button title="Add" onPress={this.addTheme.bind(this)}/>    
                </CardSection> 
            </Card>
       )
    }

    generateId(){
        let id = "a"
        for (let i = 0; i < 8; i++) {
            id += Math.floor(Math.random()* 9)
            
        }
        this.setState({id})
    }

    addTheme(){
        this.props.addTheme(this.state)
    }
}

export default connect(null,{addTheme}) (AddThemePage)